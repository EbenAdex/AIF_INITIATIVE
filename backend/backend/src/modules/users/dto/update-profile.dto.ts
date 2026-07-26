import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 'Ada Okafor' })
  @IsString()
  @MaxLength(120)
  fullName?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '+2348012345678' })
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'https://cdn.example.com/profiles/ada-okafor.jpg',
  })
  @IsUrl()
  profileImage?: string;
}
