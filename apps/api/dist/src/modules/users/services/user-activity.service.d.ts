import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class UserActivityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserActivity(tenantId: string, userId: string, limit?: number): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: import(".prisma/client").$Enums.ActionType;
        entityName: string;
        entityId: string;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
