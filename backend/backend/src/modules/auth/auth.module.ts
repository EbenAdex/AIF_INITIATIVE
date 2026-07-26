import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { JwtStrategy } from 'src/common/strategies/jwt-auth.strategy';

@Module({
  imports: [JwtModule.register({}), PrismaModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
