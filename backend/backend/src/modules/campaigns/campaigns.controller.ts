import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@ApiTags('Donation Campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @ApiOperation({
    summary: 'List active donation campaigns',
    description:
      'Returns publicly visible donation campaigns that are active and have not been archived.',
  })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all donation campaigns',
    description:
      'Returns active and inactive campaigns for administration, including campaigns hidden from the public website. Requires an administrator or super-administrator bearer token.',
  })
  findAllForAdmin() {
    return this.campaignsService.findAll(true);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get donation campaign details',
    description:
      'Returns the funding goal, current amount, content, and image for a single public campaign.',
  })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a donation campaign',
    description:
      'Creates a campaign for a foundation fundraising initiative. Requires an administrator or super-administrator bearer token.',
  })
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a donation campaign',
    description:
      'Updates campaign content, funding target, visibility, or image. Requires an administrator or super-administrator bearer token.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.campaignsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Archive a donation campaign',
    description:
      'Archives a campaign and removes it from public listings without deleting historical data. Requires an administrator or super-administrator bearer token.',
  })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
