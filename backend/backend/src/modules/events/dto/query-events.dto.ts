import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryEventsDto extends PaginationDto {
  @IsOptional()
  @ApiPropertyOptional({
    example: true,
    description: 'When true, return only future events.',
  })
  @Type(() => Boolean)
  @IsBoolean()
  upcoming?: boolean;
}
