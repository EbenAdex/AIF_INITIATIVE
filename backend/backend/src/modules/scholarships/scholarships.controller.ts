// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Patch,
//   Delete,
//   Query,
//   UseGuards,
// } from '@nestjs/common';


// import { CreateScholarshipDto } from './dto/create-scholarship.dto';
// import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
// import { QueryScholarshipDto } from './dto/query-scholarship.dto';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
// import { ScholarshipsService } from './scholarships.service';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { ChangeScholarshipStatusDto } from './dto/change-scholarship.dto';


// @Controller('scholarships')
// export class ScholarshipsController {
//   constructor(private service: ScholarshipsService) {}

//   // PUBLIC
//   @Get()
//   findAll(@Query() query: QueryScholarshipDto) {
//     return this.service.findAll(query);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(id);
//   }

//   // ADMIN ONLY
//   @UseGuards(JwtAuthGuard)
//   @Roles('ADMIN')
//   @Post()
//   create(@Body() dto: CreateScholarshipDto) {
//     return this.service.create(dto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Roles('ADMIN')
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateScholarshipDto) {
//     return this.service.update(id, dto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Roles('ADMIN')
//  @Patch(':id/status')
// changeStatus(
//   @Param('id') id: string,
//   @Body() dto: ChangeScholarshipStatusDto,
// ) {
//   return this.service.changeStatus(id, dto.status);
// }

//   @UseGuards(JwtAuthGuard)
//   @Roles('ADMIN')
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.service.remove(id);
//   }
// }

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

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { QueryScholarshipDto } from './dto/query-scholarship.dto';
import { ChangeScholarshipStatusDto } from './dto/change-scholarship.dto';

import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ScholarshipsService } from './scholarships.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';


@ApiTags('Scholarships')
@Controller('scholarships')
export class ScholarshipsController {
  constructor(private service: ScholarshipsService) {}


  // PUBLIC
  @Get()
  @ApiOperation({
    summary: 'List Scholarships',
    description:
      'Retrieves all available scholarship opportunities. Supports filtering and searching based on provided query parameters.',
  })
  findAll(@Query() query: QueryScholarshipDto) {
    return this.service.findAll(query);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get Scholarship',
    description:
      'Retrieves detailed information about a specific scholarship using its unique identifier.',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }



  // ADMIN ONLY

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create Scholarship',
    description:
      'Creates a new scholarship opportunity. Allows administrators to add scholarship details including title, description, eligibility criteria, deadline, and status.',
  })
  create(@Body() dto: CreateScholarshipDto) {
    return this.service.create(dto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update Scholarship',
    description:
      'Updates existing scholarship information. Administrators can modify scholarship details such as title, description, requirements, and deadlines.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateScholarshipDto,
  ) {
    return this.service.update(id, dto);
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update Scholarship Status',
    description:
      'Changes the current status of a scholarship opportunity. Used by administrators to publish, activate, close, or archive scholarships.',
  })
  changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeScholarshipStatusDto,
  ) {
    return this.service.changeStatus(id, dto.status);
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete Scholarship',
    description:
      'Deletes a scholarship record from the system. This action is restricted to administrators.',
  })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
