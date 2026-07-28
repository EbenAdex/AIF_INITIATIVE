import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateScholarshipDto {
  @ApiProperty({ example: 'Frontend Scholarship 2026' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Full scholarship for frontend developers' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  amount!: number;

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency!: string;

  @ApiProperty({ example: 'Students only' })
  @IsString()
  eligibility!: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  category!: string;

  @ApiProperty({ example: '2026-12-01' })
  @IsDateString()
  deadline!: string;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  @IsNumber()
  maxApplicants?: number;
}