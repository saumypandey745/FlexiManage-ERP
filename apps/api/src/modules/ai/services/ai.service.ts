import { Injectable, NotFoundException } from '@nestjs/common';
import { AiConversationRepository } from '../repositories/ai-conversation.repository';
import { AiUsageRepository } from '../repositories/ai-usage.repository';
import { AiPromptRepository } from '../repositories/ai-prompt.repository';
import { AiGatewayService } from '../providers/ai-gateway.service';
import { ChatRequestDto, CreateTemplateDto } from '../dto/ai.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(
    private readonly conversationRepo: AiConversationRepository,
    private readonly usageRepo: AiUsageRepository,
    private readonly promptRepo: AiPromptRepository,
    private readonly gatewayService: AiGatewayService,
    private readonly prisma: PrismaService,
  ) {}

  async chat(tenantId: string, userId: string, dto: ChatRequestDto) {
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

    const activeConversationId = conversationId as string;

    const conversation = await this.conversationRepo.getConversation(tenantId, activeConversationId);
    if (!conversation) throw new NotFoundException('Conversation not found');

    const provider = this.gatewayService.getProvider();
    
    // Save user message
    await this.conversationRepo.addMessage(tenantId, activeConversationId, 'USER', dto.message);

    const messages = conversation.messages.map(m => ({ role: m.role, content: m.content }));
    messages.push({ role: 'USER', content: dto.message });

    const startTime = Date.now();
    const result = await provider.chat({
      systemPrompt,
      messages
    });
    const latencyMs = Date.now() - startTime;

    // Save assistant message
    await this.conversationRepo.addMessage(tenantId, activeConversationId, 'ASSISTANT', result.content, result.toolCalls);

    // Log usage
    await this.usageRepo.logUsage({
      tenantId,
      userId,
      conversationId: activeConversationId,
      modelName: result.model,
      promptTokens: result.usage.promptTokens,
      completionTokens: result.usage.completionTokens,
      totalTokens: result.usage.totalTokens,
      latencyMs,
      costEst: (result.usage.totalTokens * 0.0001) // mock calculation
    });

    return {
      conversationId: activeConversationId,
      content: result.content,
      toolCalls: result.toolCalls
    };
  }

  async getConversations(tenantId: string, userId: string) {
    const [data, total] = await this.conversationRepo.findMany(tenantId, userId);
    return { data, total };
  }

  async getConversation(tenantId: string, id: string) {
    const conversation = await this.conversationRepo.getConversation(tenantId, id);
    if (!conversation) throw new NotFoundException('Conversation not found');
    return conversation;
  }

  async deleteConversation(tenantId: string, id: string) {
    await this.conversationRepo.softDelete(tenantId, id);
    return { success: true };
  }

  async createTemplate(tenantId: string, dto: CreateTemplateDto) {
    return this.promptRepo.create(tenantId, dto);
  }

  async getTemplates(tenantId: string) {
    return this.promptRepo.findAll(tenantId);
  }
}
