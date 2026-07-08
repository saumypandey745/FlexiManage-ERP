import { DashboardService } from '../services/dashboard.service';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    create(req: any, dto: CreateDashboardDto): Promise<{
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
    findAll(req: any, page?: number, limit?: number): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateDashboardDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
    addWidget(req: any, id: string, dto: WidgetDto): Promise<{
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
    removeWidget(req: any, id: string, widgetId: string): Promise<{
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
