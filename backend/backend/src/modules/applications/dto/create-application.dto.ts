import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';


export class CreateApplicationDto {

  @ApiProperty({
    description: 'The scholarship ID the user wants to apply for',
    example: '9f2a4c3b-8e8e-4f3c-a123-123456789abc',
  })
  @IsUUID()
  scholarshipId!: string;


  @ApiProperty({
    description: 'Applicant personal statement',
    example:
      'I am applying for this scholarship because it will help me continue my education and achieve my career goals.',
  })
  @IsString()
  @MinLength(50)
  statement!: string;


  @ApiPropertyOptional({
    description: 'URL of uploaded CV document',
    example:
      'https://cloudinary.com/student-cv.pdf',
  })
  @IsOptional()
  @IsUrl()
  cvUrl?: string;


  @ApiPropertyOptional({
    description: 'URL of uploaded academic transcript',
    example:
      'https://cloudinary.com/transcript.pdf',
  })
  @IsOptional()
  @IsUrl()
  transcriptUrl?: string;


  @ApiPropertyOptional({
    description: 'URL of uploaded passport photograph',
    example:
      'https://cloudinary.com/passport.jpg',
  })
  @IsOptional()
  @IsUrl()
  passportUrl?: string;

}