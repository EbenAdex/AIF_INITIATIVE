import { NotificationType } from '@prisma/client';
import { IsEnum, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsUUID()
  @ApiProperty({ format: 'uuid', description: 'ID of the recipient user.' })
  userId!: string;

  @IsString()
  @ApiProperty({ example: 'Application received' })
  @MaxLength(160)
  title!: string;

  @IsString()
  @ApiProperty({ example: 'We have received your scholarship application.' })
  message!: string;

  @IsEnum(NotificationType)
  @ApiProperty({
    enum: NotificationType,
    example: NotificationType.APPLICATION,
  })
  type!: NotificationType;
}
