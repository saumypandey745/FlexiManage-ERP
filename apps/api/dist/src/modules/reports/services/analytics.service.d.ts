import { AnalyticsRepository } from '../repositories/analytics.repository';
export declare class AnalyticsService {
    private readonly analyticsRepository;
    constructor(analyticsRepository: AnalyticsRepository);
    getMetrics(tenantId: string): Promise<{
        code: string;
        type: import(".prisma/client").$Enums.MetricType;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        aggregation: import(".prisma/client").$Enums.AggregationType;
        isActive: boolean;
    }[]>;
    getKpiData(tenantId: string, metricId: string, fromDate: Date, toDate: Date): Promise<{
        value: number;
        id: string;
        tenantId: string;
        metricId: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue | null;
        snapshotDate: Date;
    }[]>;
    trackEvent(tenantId: string, eventName: string, payload: any, source: string, userId?: string): Promise<{
        id: string;
        tenantId: string;
        userId: string | null;
        source: string;
        eventName: string;
        payload: import("@prisma/client/runtime/library").JsonValue;
        timestamp: Date;
    }>;
}
