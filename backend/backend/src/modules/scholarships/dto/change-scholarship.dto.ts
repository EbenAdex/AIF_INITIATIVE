import { ApiProperty } from '@nestjs/swagger';
import { ScholarshipStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class ChangeScholarshipStatusDto {
  @ApiProperty({
    enum: ScholarshipStatus,
    example: ScholarshipStatus.ACTIVE,
  })
  @IsEnum(ScholarshipStatus)
  status!: ScholarshipStatus;
}