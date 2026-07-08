export declare enum ReportType {
    STANDARD = "STANDARD",
    CUSTOM = "CUSTOM",
    FINANCIAL = "FINANCIAL",
    HR = "HR",
    PROJECT = "PROJECT",
    CRM = "CRM",
    INVENTORY = "INVENTORY"
}
export declare enum ReportStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export declare enum ExportFormat {
    CSV = "CSV",
    EXCEL = "EXCEL",
    PDF = "PDF",
    JSON = "JSON"
}
export declare enum ScheduleFrequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    YEARLY = "YEARLY"
}
export declare class CreateReportDto {
    name: string;
    description?: string;
    type: ReportType;
    queryConfig: Record<string, any>;
    columns: Record<string, any>;
}
export declare class UpdateReportDto {
    name?: string;
    description?: string;
    status?: ReportStatus;
    queryConfig?: Record<string, any>;
    columns?: Record<string, any>;
}
export declare class GenerateReportDto {
    filters?: Record<string, any>;
}
export declare class ScheduleReportDto {
    name: string;
    frequency: ScheduleFrequency;
    cronExpression?: string;
    exportFormat: ExportFormat;
    recipients: Record<string, any>;
}
export declare class ExportDto {
    format: ExportFormat;
    filters?: Record<string, any>;
}
