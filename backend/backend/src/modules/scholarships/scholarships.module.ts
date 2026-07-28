import { Module } from '@nestjs/common';
import { ScholarshipsController } from './scholarships.controller';
import { ScholarshipsService } from './scholarships.service';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [ScholarshipsController],
  providers: [ScholarshipsService, PrismaService],
})
export class ScholarshipsModule {}