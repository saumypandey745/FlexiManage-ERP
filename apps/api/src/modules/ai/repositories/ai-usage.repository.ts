import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class AiUsageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async logUsage(data: {
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
  }) {
    return this.prisma.aiUsage.create({
      data,
    });
  }

  async getUsageByTenant(tenantId: string) {
    // Basic aggregation for cost and tokens
    const result = await this.prisma.aiUsage.aggregate({
      where: { tenantId },
      _sum: {
        totalTokens: true,
        costEst: true,
      },
      _count: {
        id: true,
      },
    });
    return result;
  }
}
