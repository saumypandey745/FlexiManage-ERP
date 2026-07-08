"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const ai_conversation_repository_1 = require("../repositories/ai-conversation.repository");
const ai_usage_repository_1 = require("../repositories/ai-usage.repository");
const ai_prompt_repository_1 = require("../repositories/ai-prompt.repository");
const ai_gateway_service_1 = require("../providers/ai-gateway.service");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AiService = class AiService {
    constructor(conversationRepo, usageRepo, promptRepo, gatewayService, prisma) {
        this.conversationRepo = conversationRepo;
        this.usageRepo = usageRepo;
        this.promptRepo = promptRepo;
        this.gatewayService = gatewayService;
        this.prisma = prisma;
    }
    async chat(tenantId, userId, dto) {
        let conversationId = dto.conversationId;
        let systemPrompt = 'You are a helpful Enterprise AI assistant.';
        if (dto.templateCode) {
            const template = await this.promptRepo.findByCode(tenantId, dto.templateCode);
            if (template) {
                systemPrompt = template.systemPrompt;
            }
        }
        if (!conversationId) {
            const conv = await this.conversationRepo.createConversation(tenantId, userId, dto.message.substring(0, 50));
            conversationId = conv.id;
        }
        const activeConversationId = conversationId;
        const conversation = await this.conversationRepo.getConversation(tenantId, activeConversationId);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        const provider = this.gatewayService.getProvider();
        await this.conversationRepo.addMessage(tenantId, activeConversationId, 'USER', dto.message);
        const messages = conversation.messages.map(m => ({ role: m.role, content: m.content }));
        messages.push({ role: 'USER', content: dto.message });
        const startTime = Date.now();
        const result = await provider.chat({
            systemPrompt,
            messages
        });
        const latencyMs = Date.now() - startTime;
        await this.conversationRepo.addMessage(tenantId, activeConversationId, 'ASSISTANT', result.content, result.toolCalls);
        await this.usageRepo.logUsage({
            tenantId,
            userId,
            conversationId: activeConversationId,
            modelName: result.model,
            promptTokens: result.usage.promptTokens,
            completionTokens: result.usage.completionTokens,
            totalTokens: result.usage.totalTokens,
            latencyMs,
            costEst: (result.usage.totalTokens * 0.0001)
        });
        return {
            conversationId: activeConversationId,
            content: result.content,
            toolCalls: result.toolCalls
        };
    }
    async getConversations(tenantId, userId) {
        const [data, total] = await this.conversationRepo.findMany(tenantId, userId);
        return { data, total };
    }
    async getConversation(tenantId, id) {
        const conversation = await this.conversationRepo.getConversation(tenantId, id);
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        return conversation;
    }
    async deleteConversation(tenantId, id) {
        await this.conversationRepo.softDelete(tenantId, id);
        return { success: true };
    }
    async createTemplate(tenantId, dto) {
        return this.promptRepo.create(tenantId, dto);
    }
    async getTemplates(tenantId) {
        return this.promptRepo.findAll(tenantId);
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_conversation_repository_1.AiConversationRepository,
        ai_usage_repository_1.AiUsageRepository,
        ai_prompt_repository_1.AiPromptRepository,
        ai_gateway_service_1.AiGatewayService,
        prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map