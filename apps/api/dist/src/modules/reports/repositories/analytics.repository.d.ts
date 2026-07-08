import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, KpiSnapshot, MetricDefinition, AnalyticsEvent } from '@prisma/client';
export declare class AnalyticsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMetric(tenantId: string, data: Prisma.MetricDefinitionCreateInput): Promise<MetricDefinition>;
    findMetrics(tenantId: string): Promise<MetricDefinition[]>;
    createKpiSnapshot(tenantId: string, metricId: string, value: number, dimensions?: any): Promise<KpiSnapshot>;
    findSnapshots(tenantId: string, metricId: string, fromDate: Date, toDate: Date): Promise<KpiSnapshot[]>;
    trackEvent(tenantId: string, eventName: string, payload: any, source: string, userId?: string): Promise<AnalyticsEvent>;
}
