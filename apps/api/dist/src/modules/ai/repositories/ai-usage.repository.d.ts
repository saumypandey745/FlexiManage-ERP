import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AiUsageRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logUsage(data: {
        tenantId: string;
        userId: string;
        conversationId?: string;
        providerId?: string;
        modelName: string;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        latencyMs: number;
        costEst: number;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        providerId: string | null;
        conversationId: string | null;
        modelName: string;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        costEst: import("@prisma/client/runtime/library").Decimal;
        latencyMs: number;
    }>;
    getUsageByTenant(tenantId: string): Promise<import(".prisma/client").Prisma.GetAiUsageAggregateType<{
        where: {
            tenantId: string;
        };
        _sum: {
            totalTokens: true;
            costEst: true;
        };
        _count: {
            id: true;
        };
    }>>;
}
