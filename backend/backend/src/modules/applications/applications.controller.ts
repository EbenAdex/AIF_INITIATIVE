import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // ================================
  // USER SUBMITS APPLICATION
  // ================================

  @Post()
  @ApiOperation({
    summary: 'Submit Application',

    description:
      'Allows an authenticated user to submit an application for an available scholarship opportunity.',
  })
  create(
    @Request() req: any,

    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(
      req.user.sub,

      dto,
    );
  }

  // ================================
  // USER VIEW OWN APPLICATIONS
  // ================================

  @Get('my')
  @ApiOperation({
    summary: 'Get My Applications',

    description:
      'Retrieves all scholarship applications submitted by the currently authenticated user.',
  })
  findMyApplications(@Request() req: any) {
    return this.applicationsService.findMyApplications(req.user.sub);
  }

  // ================================
  // ADMIN VIEW ALL APPLICATIONS
  // ================================

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({
    summary: 'List Applications',

    description:
      'Retrieves all scholarship applications for administrative review.',
  })
  findAll() {
    return this.applicationsService.findAll();
  }

  // ================================
  // VIEW SINGLE APPLICATION
  // ================================

  @Get(':id')
  @ApiOperation({
    summary: 'Get Application',

    description:
      'Retrieves detailed information about a specific scholarship application.',
  })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { sub: string; role: string },
  ) {
    return this.applicationsService.findOne(id, user);
  }

  // ================================
  // ADMIN UPDATE APPLICATION STATUS
  // ================================

  @Patch(':id/status')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({
    summary: 'Update Application Status',

    description:
      'Allows administrators to review applications and approve, reject, or move applications under review.',
  })
  updateStatus(
    @Param('id') id: string,

    @Request() req: any,

    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateStatus(
      id,

      req.user.sub,

      dto,
    );
  }

  // ================================
  // USER WITHDRAW APPLICATION
  // ================================

  @Delete(':id')
  @ApiOperation({
    summary: 'Withdraw Application',

    description:
      'Allows a user to withdraw their submitted scholarship application.',
  })
  remove(
    @Param('id') id: string,

    @Request() req: any,
  ) {
    return this.applicationsService.remove(
      id,

      req.user.sub,
    );
  }
}
