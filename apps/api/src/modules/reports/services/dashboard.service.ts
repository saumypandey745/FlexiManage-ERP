import { Injectable, NotFoundException } from '@nestjs/common';
import { DashboardRepository } from '../repositories/dashboard.repository';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async create(tenantId: string, userId: string, dto: CreateDashboardDto) {
    return this.dashboardRepository.create(tenantId, userId, dto);
  }

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.dashboardRepository.findMany(tenantId, { skip, take: limit });
    return { data, total, page, limit };
  }

  async findOne(tenantId: string, id: string) {
    const dashboard = await this.dashboardRepository.findById(tenantId, id);
    if (!dashboard) throw new NotFoundException('Dashboard not found');
    return dashboard;
  }

  async update(tenantId: string, id: string, dto: UpdateDashboardDto) {
    await this.findOne(tenantId, id);
    return this.dashboardRepository.update(tenantId, id, dto);
  }

  async delete(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.dashboardRepository.softDelete(tenantId, id);
  }

  async addWidget(tenantId: string, dashboardId: string, dto: WidgetDto) {
    await this.findOne(tenantId, dashboardId);
    return this.dashboardRepository.addWidget(tenantId, dashboardId, dto);
  }

  async removeWidget(tenantId: string, dashboardId: string, widgetId: string) {
    await this.findOne(tenantId, dashboardId);
    return this.dashboardRepository.removeWidget(tenantId, widgetId);
  }
}
