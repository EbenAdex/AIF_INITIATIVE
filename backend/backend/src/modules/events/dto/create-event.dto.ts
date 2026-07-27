import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @ApiProperty({ example: 'Annual Education Summit' })
  @MaxLength(160)
  title!: string;

  @IsString()
  @ApiProperty({
    example: 'A full-day programme for students, educators, and partners.',
  })
  description!: string;

  @IsString()
  @ApiProperty({ example: 'Civic Centre, Lagos' })
  @MaxLength(160)
  location!: string;

  @IsDateString()
  @ApiProperty({ example: '2026-10-15T09:00:00.000Z', format: 'date-time' })
  eventDate!: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'https://cdn.example.com/events/education-summit.jpg',
  })
  @IsUrl()
  bannerImage?: string;
}
