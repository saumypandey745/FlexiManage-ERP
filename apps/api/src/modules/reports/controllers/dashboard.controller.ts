import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('dashboards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Create a new dashboard' })
  create(@Req() req: any, @Body() dto: CreateDashboardDto) {
    return this.dashboardService.create(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get all dashboards' })
  findAll(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.dashboardService.findAll(req.user.tenantId, +(page || 1), +(limit || 10));
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get a dashboard by id' })
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.dashboardService.findOne(req.user.tenantId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Update a dashboard' })
  update(
    @Req() req: any, 
    @Param('id') id: string, 
    @Body() dto: UpdateDashboardDto
  ) {
    return this.dashboardService.update(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a dashboard' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.dashboardService.delete(req.user.tenantId, id);
  }

  @Post(':id/widgets')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Add a widget to a dashboard' })
  addWidget(@Req() req: any, @Param('id') id: string, @Body() dto: WidgetDto) {
    return this.dashboardService.addWidget(req.user.tenantId, id, dto);
  }

  @Delete(':id/widgets/:widgetId')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Remove a widget from a dashboard' })
  removeWidget(@Req() req: any, @Param('id') id: string, @Param('widgetId') widgetId: string) {
    return this.dashboardService.removeWidget(req.user.tenantId, id, widgetId);
  }
}
