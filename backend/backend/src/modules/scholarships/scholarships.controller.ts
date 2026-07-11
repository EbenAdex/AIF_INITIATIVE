import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';


import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { QueryScholarshipDto } from './dto/query-scholarship.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ScholarshipsService } from './scholarships.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ChangeScholarshipStatusDto } from './dto/change-scholarship.dto';


@Controller('scholarships')
export class ScholarshipsController {
  constructor(private service: ScholarshipsService) {}

  // PUBLIC
  @Get()
  findAll(@Query() query: QueryScholarshipDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateScholarshipDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateScholarshipDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
 @Patch(':id/status')
changeStatus(
  @Param('id') id: string,
  @Body() dto: ChangeScholarshipStatusDto,
) {
  return this.service.changeStatus(id, dto.status);
}

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}