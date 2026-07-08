export declare enum MetricType {
    REVENUE = "REVENUE",
    EXPENSE = "EXPENSE",
    USER_COUNT = "USER_COUNT",
    RETENTION = "RETENTION",
    CONVERSION = "CONVERSION",
    PERFORMANCE = "PERFORMANCE",
    OTHER = "OTHER"
}
export declare enum AggregationType {
    SUM = "SUM",
    COUNT = "COUNT",
    AVERAGE = "AVERAGE",
    MIN = "MIN",
    MAX = "MAX"
}
export declare class KpiDto {
    name: string;
    code: string;
    type: MetricType;
    aggregation: AggregationType;
    description?: string;
    isActive?: boolean;
}
export declare class CreateKpiSnapshotDto {
    value: number;
    dimensions?: Record<string, any>;
}
