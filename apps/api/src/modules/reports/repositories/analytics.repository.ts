import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, KpiSnapshot, MetricDefinition, AnalyticsEvent } from '@prisma/client';

@Injectable()
export class AnalyticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMetric(tenantId: string, data: Prisma.MetricDefinitionCreateInput): Promise<MetricDefinition> {
    return this.prisma.metricDefinition.create({
      data: { ...data, tenant: { connect: { id: tenantId } } }
    });
  }

  async findMetrics(tenantId: string): Promise<MetricDefinition[]> {
    return this.prisma.metricDefinition.findMany({
      where: { tenantId }
    });
  }

  async createKpiSnapshot(tenantId: string, metricId: string, value: number, dimensions?: any): Promise<KpiSnapshot> {
    return this.prisma.kpiSnapshot.create({
      data: {
        tenantId,
        metricId,
        value,
        dimensions: dimensions || {}
      }
    });
  }

  async findSnapshots(tenantId: string, metricId: string, fromDate: Date, toDate: Date): Promise<KpiSnapshot[]> {
    return this.prisma.kpiSnapshot.findMany({
      where: {
        tenantId,
        metricId,
        snapshotDate: {
          gte: fromDate,
          lte: toDate
        }
      },
      orderBy: { snapshotDate: 'asc' }
    });
  }

  async trackEvent(tenantId: string, eventName: string, payload: any, source: string, userId?: string): Promise<AnalyticsEvent> {
    return this.prisma.analyticsEvent.create({
      data: {
        tenantId,
        eventName,
        payload,
        source,
        userId
      }
    });
  }
}
