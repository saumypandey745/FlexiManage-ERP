import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Req } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/notification.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create and dispatch a notification' })
  create(@Req() req: any, @Body() dto: CreateNotificationDto) {
    return this.notificationService.create(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get all notifications' })
  findAll(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.notificationService.findAll(req.user.tenantId, +(page || 1), +(limit || 10));
  }

  @Patch(':id/read')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Req() req: any, @Param('id') id: string) {
    return this.notificationService.markAsRead(req.user.tenantId, req.user.id, id);
  }
}
