import { DashboardRepository } from '../repositories/dashboard.repository';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';
export declare class DashboardService {
    private readonly dashboardRepository;
    constructor(dashboardRepository: DashboardRepository);
    create(tenantId: string, userId: string, dto: CreateDashboardDto): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        createdBy: string;
        layout: import("@prisma/client/runtime/library").JsonValue | null;
        isDefault: boolean;
    }>;
    findAll(tenantId: string, page?: number, limit?: number): Promise<{
        data: {
            description: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            createdBy: string;
            layout: import("@prisma/client/runtime/library").JsonValue | null;
            isDefault: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(tenantId: string, id: string): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        createdBy: string;
        layout: import("@prisma/client/runtime/library").JsonValue | null;
        isDefault: boolean;
    }>;
    update(tenantId: string, id: string, dto: UpdateDashboardDto): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        createdBy: string;
        layout: import("@prisma/client/runtime/library").JsonValue | null;
        isDefault: boolean;
    }>;
    delete(tenantId: string, id: string): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        createdBy: string;
        layout: import("@prisma/client/runtime/library").JsonValue | null;
        isDefault: boolean;
    }>;
    addWidget(tenantId: string, dashboardId: string, dto: WidgetDto): Promise<{
        type: import(".prisma/client").$Enums.WidgetType;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        chartType: import(".prisma/client").$Enums.ChartType | null;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
        dataSource: import("@prisma/client/runtime/library").JsonValue;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        dashboardId: string;
    }>;
    removeWidget(tenantId: string, dashboardId: string, widgetId: string): Promise<{
        type: import(".prisma/client").$Enums.WidgetType;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        chartType: import(".prisma/client").$Enums.ChartType | null;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
        dataSource: import("@prisma/client/runtime/library").JsonValue;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        dashboardId: string;
    }>;
}
