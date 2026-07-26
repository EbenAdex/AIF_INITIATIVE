import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCampaignDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 'Sponsor a Student' })
  @IsString()
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'Fund tuition and learning materials for 100 students.',
  })
  @IsString()
  description?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: '5000000.00',
    description: 'Fundraising target as a decimal amount.',
  })
  @IsNumberString()
  targetAmount?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'https://cdn.example.com/campaigns/sponsor-a-student.jpg',
  })
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  isActive?: boolean;
}
