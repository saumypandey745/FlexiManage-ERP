import { AiConversationRepository } from '../repositories/ai-conversation.repository';
import { AiUsageRepository } from '../repositories/ai-usage.repository';
import { AiPromptRepository } from '../repositories/ai-prompt.repository';
import { AiGatewayService } from '../providers/ai-gateway.service';
import { ChatRequestDto, CreateTemplateDto } from '../dto/ai.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AiService {
    private readonly conversationRepo;
    private readonly usageRepo;
    private readonly promptRepo;
    private readonly gatewayService;
    private readonly prisma;
    constructor(conversationRepo: AiConversationRepository, usageRepo: AiUsageRepository, promptRepo: AiPromptRepository, gatewayService: AiGatewayService, prisma: PrismaService);
    chat(tenantId: string, userId: string, dto: ChatRequestDto): Promise<{
        conversationId: string;
        content: string;
        toolCalls: any[] | undefined;
    }>;
    getConversations(tenantId: string, userId: string): Promise<{
        data: {
            status: string;
            title: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            providerId: string | null;
        }[];
        total: number;
    }>;
    getConversation(tenantId: string, id: string): Promise<{
        messages: {
            role: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
            conversationId: string;
            toolCalls: import("@prisma/client/runtime/library").JsonValue | null;
            toolResult: import("@prisma/client/runtime/library").JsonValue | null;
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
    }>;
    deleteConversation(tenantId: string, id: string): Promise<{
        success: boolean;
    }>;
    createTemplate(tenantId: string, dto: CreateTemplateDto): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isActive: boolean;
        systemPrompt: string;
        userPrompt: string | null;
    }>;
    getTemplates(tenantId: string): Promise<{
        code: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isActive: boolean;
        systemPrompt: string;
        userPrompt: string | null;
    }[]>;
}
