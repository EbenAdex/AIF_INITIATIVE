import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `
        <h2>Welcome to AIF Initiative</h2>
        <p>Click below to verify your email:</p>
        <a href="${url}">Verify Email</a>
      `,
    });
  }

  async sendResetPassword(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      html: `
        <p>Click below to reset your password:</p>
        <a href="${url}">Reset Password</a>
      `,
    });
  }
}