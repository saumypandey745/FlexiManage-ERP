import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, AiConversation, AiConversationMessage } from '@prisma/client';

@Injectable()
export class AiConversationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createConversation(tenantId: string, userId: string, title?: string, providerId?: string): Promise<AiConversation> {
    return this.prisma.aiConversation.create({
      data: {
        tenantId,
        userId,
        title,
        providerId,
        status: 'ACTIVE'
      }
    });
  }

  async getConversation(tenantId: string, id: string) {
    return this.prisma.aiConversation.findUnique({
      where: { id, tenantId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });
  }

  async findMany(tenantId: string, userId: string, skip = 0, take = 20): Promise<[AiConversation[], number]> {
    return Promise.all([
      this.prisma.aiConversation.findMany({
        where: { tenantId, userId, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      this.prisma.aiConversation.count({
        where: { tenantId, userId, deletedAt: null }
      })
    ]);
  }

  async addMessage(tenantId: string, conversationId: string, role: string, content: string, toolCalls?: any, toolResult?: any): Promise<AiConversationMessage> {
    return this.prisma.aiConversationMessage.create({
      data: {
        tenantId,
        conversationId,
        role,
        content,
        toolCalls,
        toolResult
      }
    });
  }

  async softDelete(tenantId: string, id: string) {
    return this.prisma.aiConversation.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: 'ARCHIVED' }
    });
  }
}
