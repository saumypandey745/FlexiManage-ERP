export declare enum WidgetType {
    CHART = "CHART",
    TABLE = "TABLE",
    KPI_CARD = "KPI_CARD",
    MAP = "MAP",
    TIMELINE = "TIMELINE"
}
export declare enum ChartType {
    BAR = "BAR",
    LINE = "LINE",
    PIE = "PIE",
    DOUGHNUT = "DOUGHNUT",
    AREA = "AREA",
    SCATTER = "SCATTER"
}
export declare class CreateDashboardDto {
    name: string;
    description?: string;
    layout?: Record<string, any>;
    isDefault?: boolean;
}
export declare class UpdateDashboardDto {
    name?: string;
    description?: string;
    layout?: Record<string, any>;
    isDefault?: boolean;
}
export declare class WidgetDto {
    name: string;
    type: WidgetType;
    chartType?: ChartType;
    positionX?: number;
    positionY?: number;
    width?: number;
    height?: number;
    dataSource: Record<string, any>;
    config?: Record<string, any>;
}
