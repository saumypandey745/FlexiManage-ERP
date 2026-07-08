import { PrismaService } from '../../../common/prisma/prisma.service';
import { Webhook, Prisma } from '@prisma/client';
export declare class WebhookRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.WebhookCreateInput): Promise<Webhook>;
    findById(tenantId: string, id: string): Promise<Webhook | null>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
    }): Promise<[Webhook[], number]>;
    update(tenantId: string, id: string, data: Prisma.WebhookUpdateInput): Promise<Webhook>;
    remove(tenantId: string, id: string): Promise<Webhook>;
}
