import { Controller, Get, Post, Body, UseGuards, Query, Req } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('metrics')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get all metrics definitions' })
  getMetrics(@Req() req: any) {
    return this.analyticsService.getMetrics(req.user.tenantId);
  }

  @Get('kpis')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get KPI data snapshots' })
  getKpiData(
    @Req() req: any,
    @Query('metricId') metricId: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.analyticsService.getKpiData(req.user.tenantId, metricId, new Date(fromDate), new Date(toDate));
  }

  @Post('events')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Track an analytics event' })
  trackEvent(
    @Req() req: any,
    @Body() dto: { eventName: string; payload: any; source: string }
  ) {
    return this.analyticsService.trackEvent(
      req.user.tenantId,
      dto.eventName,
      dto.payload,
      dto.source,
      req.user.id
    );
  }
}
