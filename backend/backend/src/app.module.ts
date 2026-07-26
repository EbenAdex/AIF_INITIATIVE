// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { ScholarshipsModule } from './modules/scholarships/scholarships.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { EventsModule } from './modules/events/events.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
    MailModule,
    ScholarshipsModule,
    ApplicationsModule,
    EventsModule,
    CampaignsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
