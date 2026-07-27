import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({
    summary: 'List my notifications',
    description:
      'Returns notifications for the authenticated user, newest first. A user can access only their own notifications.',
  })
  findMine(@CurrentUser() user: { sub: string }) {
    return this.notificationsService.findMine(user.sub);
  }

  @Get('unread-count')
  @ApiOperation({
    summary: 'Get unread notification count',
    description:
      'Returns the number of unread notifications for the authenticated user. Use this endpoint to display a notification badge.',
  })
  unreadCount(@CurrentUser() user: { sub: string }) {
    return this.notificationsService.unreadCount(user.sub);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Send a notification',
    description:
      'Creates a notification for a specific user. Requires an administrator or super-administrator bearer token.',
  })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Patch('read-all')
  @ApiOperation({
    summary: 'Mark all notifications as read',
    description:
      'Marks every unread notification belonging to the authenticated user as read.',
  })
  markAllRead(@CurrentUser() user: { sub: string }) {
    return this.notificationsService.markAllRead(user.sub);
  }

  @Patch(':id/read')
  @ApiOperation({
    summary: 'Mark one notification as read',
    description:
      'Marks one notification as read when it belongs to the authenticated user.',
  })
  markRead(@Param('id') id: string, @CurrentUser() user: { sub: string }) {
    return this.notificationsService.markRead(id, user.sub);
  }
}
