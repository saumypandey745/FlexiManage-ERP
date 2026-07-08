import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, AiConversation, AiConversationMessage } from '@prisma/client';
export declare class AiConversationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createConversation(tenantId: string, userId: string, title?: string, providerId?: string): Promise<AiConversation>;
    getConversation(tenantId: string, id: string): Promise<({
        messages: {
            role: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
            conversationId: string;
            toolCalls: Prisma.JsonValue | null;
            toolResult: Prisma.JsonValue | null;
        }[];
    } & {
        status: string;
        title: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        providerId: string | null;
    }) | null>;
    findMany(tenantId: string, userId: string, skip?: number, take?: number): Promise<[AiConversation[], number]>;
    addMessage(tenantId: string, conversationId: string, role: string, content: string, toolCalls?: any, toolResult?: any): Promise<AiConversationMessage>;
    softDelete(tenantId: string, id: string): Promise<{
        status: string;
        title: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        providerId: string | null;
    }>;
}
