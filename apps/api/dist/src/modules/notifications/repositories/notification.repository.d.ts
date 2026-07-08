import { PrismaService } from '../../../common/prisma/prisma.service';
import { Notification, Prisma } from '@prisma/client';
export declare class NotificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.NotificationCreateInput): Promise<Notification>;
    findById(tenantId: string, id: string): Promise<Notification | null>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
        where?: Prisma.NotificationWhereInput;
        orderBy?: Prisma.NotificationOrderByWithRelationInput;
    }): Promise<[Notification[], number]>;
    update(tenantId: string, id: string, data: Prisma.NotificationUpdateInput): Promise<Notification>;
    softDelete(tenantId: string, id: string): Promise<Notification>;
}
