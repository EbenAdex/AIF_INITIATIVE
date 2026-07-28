import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 'Annual Education Summit' })
  @IsString()
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'A full-day programme for students, educators, and partners.',
  })
  @IsString()
  description?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Civic Centre, Lagos' })
  @IsString()
  @MaxLength(160)
  location?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: '2026-10-15T09:00:00.000Z',
    format: 'date-time',
  })
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'https://cdn.example.com/events/education-summit.jpg',
  })
  @IsUrl()
  bannerImage?: string;
}
