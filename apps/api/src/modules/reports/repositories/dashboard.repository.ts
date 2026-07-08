import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, Dashboard, DashboardWidget } from '@prisma/client';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreateDashboardDto): Promise<Dashboard> {
    return this.prisma.dashboard.create({
      data: {
        tenantId,
        createdBy: userId,
        name: dto.name,
        description: dto.description,
        layout: dto.layout || {},
        isDefault: dto.isDefault || false,
      },
    });
  }

  async findMany(tenantId: string, params: { skip?: number; take?: number }): Promise<[Dashboard[], number]> {
    const { skip, take } = params;
    return Promise.all([
      this.prisma.dashboard.findMany({
        skip,
        take,
        where: { tenantId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.dashboard.count({
        where: { tenantId, deletedAt: null },
      }),
    ]);
  }

  async findById(tenantId: string, id: string): Promise<Dashboard | null> {
    return this.prisma.dashboard.findUnique({
      where: { id, tenantId, deletedAt: null },
      include: {
        widgets: true,
      }
    });
  }

  async update(tenantId: string, id: string, dto: UpdateDashboardDto): Promise<Dashboard> {
    return this.prisma.dashboard.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async softDelete(tenantId: string, id: string): Promise<Dashboard> {
    return this.prisma.dashboard.update({
      where: { id, tenantId },
      data: { deletedAt: new Date() },
    });
  }

  async addWidget(tenantId: string, dashboardId: string, dto: WidgetDto): Promise<DashboardWidget> {
    return this.prisma.dashboardWidget.create({
      data: {
        tenantId,
        dashboardId,
        name: dto.name,
        type: dto.type,
        chartType: dto.chartType,
        positionX: dto.positionX || 0,
        positionY: dto.positionY || 0,
        width: dto.width || 1,
        height: dto.height || 1,
        dataSource: dto.dataSource,
        config: dto.config || {}
      }
    });
  }

  async removeWidget(tenantId: string, widgetId: string): Promise<DashboardWidget> {
    return this.prisma.dashboardWidget.delete({
      where: { id: widgetId, tenantId }
    });
  }
}
