import { AnalyticsService } from '../services/analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getMetrics(req: any): Promise<{
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
    getKpiData(req: any, metricId: string, fromDate: string, toDate: string): Promise<{
        value: number;
        id: string;
        tenantId: string;
        metricId: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue | null;
        snapshotDate: Date;
    }[]>;
    trackEvent(req: any, dto: {
        eventName: string;
        payload: any;
        source: string;
    }): Promise<{
        id: string;
        tenantId: string;
        userId: string | null;
        source: string;
        eventName: string;
        payload: import("@prisma/client/runtime/library").JsonValue;
        timestamp: Date;
    }>;
}
