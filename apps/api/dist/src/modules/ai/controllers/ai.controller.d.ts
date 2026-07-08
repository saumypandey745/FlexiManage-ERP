import { AiService } from '../services/ai.service';
import { ChatRequestDto, CreateTemplateDto, SemanticSearchDto, EmbedDocumentDto } from '../dto/ai.dto';
import { AiVectorRepository } from '../repositories/ai-vector.repository';
import { AiGatewayService } from '../providers/ai-gateway.service';
export declare class AiController {
    private readonly aiService;
    private readonly vectorRepo;
    private readonly gatewayService;
    constructor(aiService: AiService, vectorRepo: AiVectorRepository, gatewayService: AiGatewayService);
    chat(req: any, dto: ChatRequestDto): Promise<{
        conversationId: string;
        content: string;
        toolCalls: any[] | undefined;
    }>;
    createTemplate(req: any, dto: CreateTemplateDto): Promise<{
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
    getTemplates(req: any): Promise<{
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
    getConversations(req: any): Promise<{
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
    getConversation(req: any, id: string): Promise<{
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
    deleteConversation(req: any, id: string): Promise<{
        success: boolean;
    }>;
    embedDocument(req: any, dto: EmbedDocumentDto): Promise<{
        success: boolean;
        documentId: string;
    }>;
    semanticSearch(req: any, dto: SemanticSearchDto): Promise<unknown>;
}
