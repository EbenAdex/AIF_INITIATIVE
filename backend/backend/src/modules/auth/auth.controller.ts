import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// DTOs
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RefreshTokenDto } from './dto/refresh.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

// Swagger
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  // -------------------
  // REGISTER
  // -------------------
  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register User',
    description:
      'Creates a new user account and initiates the account verification process. The user receives an email verification request after successful registration.',
  })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  // -------------------
  // LOGIN
  // -------------------
  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login User',
    description:
      'Authenticates an existing user using their login credentials and generates authentication tokens for accessing protected resources.',
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.auth.login(dto);
    this.setAccessTokenCookie(response, tokens.accessToken);
    return tokens;
  }

  // -------------------
  // VERIFY EMAIL
  // -------------------
  @Public()
  @Post('verify-email')
  @ApiOperation({
    summary: 'Verify User Email',
    description:
      'Verifies a user email address using the verification token sent during registration and activates the user account.',
  })
  verify(@Body() dto: VerifyEmailDto) {
    return this.auth.verifyEmail(dto.token);
  }

  @Public()
  @Post('resend-verification')
  @ApiOperation({
    summary: 'Resend verification email',
    description:
      'Sends a fresh verification link to an unverified account. This endpoint accepts an email address and always returns the same response to protect account privacy.',
  })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.auth.resendVerification(dto.email);
  }

  // -------------------
  // FORGOT PASSWORD
  // -------------------
  @Public()
  @Post('forgot-password')
  @ApiOperation({
    summary: 'Request Password Reset',
    description:
      'Allows users who have forgotten their password to request a password reset process using their registered email address.',
  })
  forgot(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email);
  }

  // -------------------
  // RESET PASSWORD
  // -------------------
  @Public()
  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset Password',
    description:
      'Updates a user password after successful verification of the password reset request.',
  })
  reset(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.password);
  }

  // -------------------
  // REFRESH TOKEN
  // -------------------
  @Public()
  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh Authentication Token',
    description:
      'Generates a new access token using a valid refresh token, allowing users to continue their session without logging in again.',
  })
  async refreshToken(
    @Body() dto: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.auth.refreshToken(dto.refreshToken);
    this.setAccessTokenCookie(response, tokens.accessToken);
    return tokens;
  }

  // -------------------
  // LOGOUT
  // -------------------
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout User',
    description:
      'Terminates the active user session and invalidates authentication credentials.',
  })
  async logout(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('aif_access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return this.auth.logout(req.user.sub);
  }

  private setAccessTokenCookie(response: Response, accessToken: string) {
    response.cookie('aif_access_token', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
}
