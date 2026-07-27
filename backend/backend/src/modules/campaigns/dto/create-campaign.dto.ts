import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCampaignDto {
  @IsString()
  @ApiProperty({ example: 'Sponsor a Student' })
  @MaxLength(160)
  title!: string;

  @IsString()
  @ApiProperty({
    example: 'Fund tuition and learning materials for 100 students.',
  })
  description!: string;

  @IsNumberString()
  @ApiProperty({
    example: '5000000.00',
    description: 'Fundraising target as a decimal amount.',
  })
  targetAmount!: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'https://cdn.example.com/campaigns/sponsor-a-student.jpg',
  })
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  isActive?: boolean;
}
