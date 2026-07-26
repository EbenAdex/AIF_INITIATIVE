import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const port = Number(config.get<string>('MAIL_PORT') ?? 587);

        return {
          transport: {
            host: config.getOrThrow<string>('MAIL_HOST'),
            port,
            secure: port === 465,
            auth: {
              user: config.getOrThrow<string>('MAIL_USER'),
              pass: config.getOrThrow<string>('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: config.getOrThrow<string>('MAIL_FROM'),
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
