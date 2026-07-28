import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';


export enum ApplicationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}


export class UpdateApplicationStatusDto {


  @ApiProperty({
    description: 'New status of the application',
    enum: ApplicationStatus,
    example: ApplicationStatus.APPROVED,
  })
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;



  @ApiPropertyOptional({
    description:
      'Reason or comment from the administrator during review',
    example:
      'Applicant met all academic requirements.',
  })
  @IsOptional()
  @IsString()
  reviewReason?: string;

}