import { PrismaService } from '../../../common/prisma/prisma.service';
import { Dashboard, DashboardWidget } from '@prisma/client';
import { CreateDashboardDto, UpdateDashboardDto, WidgetDto } from '../dto/dashboard.dto';
export declare class DashboardRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, userId: string, dto: CreateDashboardDto): Promise<Dashboard>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
    }): Promise<[Dashboard[], number]>;
    findById(tenantId: string, id: string): Promise<Dashboard | null>;
    update(tenantId: string, id: string, dto: UpdateDashboardDto): Promise<Dashboard>;
    softDelete(tenantId: string, id: string): Promise<Dashboard>;
    addWidget(tenantId: string, dashboardId: string, dto: WidgetDto): Promise<DashboardWidget>;
    removeWidget(tenantId: string, widgetId: string): Promise<DashboardWidget>;
}
