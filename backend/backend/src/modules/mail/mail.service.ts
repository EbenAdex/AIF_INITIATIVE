import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await this.sendMail({
      to: email,
      subject: 'Verify your AIF Initiative email address',
      text: [
        'Welcome to AIF Initiative.',
        '',
        'Please verify your email address to activate your account:',
        url,
        '',
        'This link expires in 1 hour. If you did not create an AIF Initiative account, you can safely ignore this email.',
      ].join('\n'),
      html: `
        <!doctype html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#1f2937;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
                    <tr>
                      <td style="padding:28px 32px;background:#1e237e;color:#ffffff;">
                        <h1 style="margin:0;font-size:24px;line-height:32px;">AIF Initiative</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:32px;">
                        <h2 style="margin:0 0 16px;font-size:22px;line-height:30px;">Verify your email address</h2>
                        <p style="margin:0 0 16px;line-height:24px;">Welcome to AIF Initiative. Please confirm your email address to activate your account and continue.</p>
                        <p style="margin:24px 0;">
                          <a href="${url}" style="display:inline-block;padding:12px 20px;background:#1e237e;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:700;">Verify email address</a>
                        </p>
                        <p style="margin:0 0 16px;line-height:24px;">This verification link expires in 1 hour.</p>
                        <p style="margin:0;line-height:24px;">If you did not create an AIF Initiative account, you can safely ignore this email.</p>
                        <hr style="margin:28px 0;border:0;border-top:1px solid #e5e7eb;">
                        <p style="margin:0;font-size:12px;line-height:18px;color:#6b7280;">If the button does not work, copy and paste this link into your browser:<br><a href="${url}" style="color:#1e237e;word-break:break-all;">${url}</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
  }

  async sendResetPassword(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.sendMail({
      to: email,
      subject: 'Reset Password',
      html: `
        <p>Click below to reset your password:</p>
        <a href="${url}">Reset Password</a>
      `,
    });
  }

  private async sendMail(message: Parameters<MailerService['sendMail']>[0]) {
    try {
      await this.mailerService.sendMail(message);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Email delivery failed: ${reason}`);
      throw new ServiceUnavailableException(
        'Email delivery is temporarily unavailable. Please try again later.',
      );
    }
  }
}
