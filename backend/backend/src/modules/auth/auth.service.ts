import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { MailService } from 'src/modules/mail/mail.service';
import { randomUUID } from 'crypto';
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  // ---------------------------
  // TOKEN GENERATION
  // ---------------------------
  async signTokens(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as any;
    const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ||
      '7d') as any;

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  // ---------------------------
  // REGISTER
  // ---------------------------

  async register(dto: any) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await argon.hash(dto.password);
    const verificationToken = randomUUID();

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email,
        phone: dto.phone,
        passwordHash,
        verificationToken,
        verificationTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

   try {
  await this.mail.sendVerificationEmail(
    user.email,
    verificationToken,
  );
} catch (error) {
  console.error('Verification email failed:', error);
}
    return {
      message: 'Registration successful. Verify email.',
    };
  }

  // ---------------------------
  // VERIFY EMAIL
  // ---------------------------

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        status: UserStatus.ACTIVE,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return { message: 'Email verified successfully' };
  }

  async resendVerification(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const message =
      'If this account needs verification, a new email has been sent';
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || user.emailVerified || user.deletedAt) {
      return { message };
    }

    const verificationToken = randomUUID();

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    await this.mail.sendVerificationEmail(user.email, verificationToken);

    return { message };
  }

  // ---------------------------
  // LOGIN
  // ---------------------------

  async login(dto: any) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await argon.verify(user.passwordHash, dto.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.emailVerified) {
      throw new ForbiddenException(
        'Please verify your email before logging in',
      );
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException('Your account is not active');
    }

    const tokens = await this.signTokens(user.id, user.email, user.role);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await argon.hash(tokens.refreshToken) },
    });

    return tokens;
  }

  // ---------------------------
  // REFRESH TOKEN
  // ---------------------------

  async refreshToken(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET!,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const refreshMatches = await argon.verify(
      user.refreshTokenHash,
      refreshToken,
    );

    if (!refreshMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.signTokens(user.id, user.email, user.role);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: await argon.hash(tokens.refreshToken) },
    });

    return tokens;
  }

  // ---------------------------
  // LOGOUT
  // ---------------------------

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
    });

    return { message: 'Logged out successfully' };
  }

  // ---------------------------
  // FORGOT PASSWORD
  // ---------------------------

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: 'If email exists, reset link has been sent',
      };
    }

    const token = randomUUID();

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpiry: new Date(Date.now() + 1800000),
      },
    });

    await this.mail.sendResetPassword(email, token);

    return {
      message: 'If email exists, reset link has been sent',
    };
  }

  // ---------------------------
  // RESET PASSWORD
  // ---------------------------

  async resetPassword(token: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    const passwordHash = await argon.hash(password);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpiry: null,
      },
    });

    return {
      message: 'Password reset successful',
    };
  }
}
