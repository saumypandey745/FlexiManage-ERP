import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { AiPromptTemplate } from "@prisma/client";
import { CreateTemplateDto } from "../dto/ai.dto";

@Injectable()
export class AiPromptRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenantId: string,
    dto: CreateTemplateDto
  ): Promise<AiPromptTemplate> {
    return this.prisma.aiPromptTemplate.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        systemPrompt: dto.systemPrompt,
        userPrompt: dto.userPrompt,
      },
    });
  }

  async findByCode(
    tenantId: string,
    code: string
  ): Promise<AiPromptTemplate | null> {
    return this.prisma.aiPromptTemplate.findUnique({
      where: {
        tenantId_code: { tenantId, code },
      },
    });
  }

  async findAll(tenantId: string): Promise<AiPromptTemplate[]> {
    return this.prisma.aiPromptTemplate.findMany({
      where: { tenantId, deletedAt: null },
    });
  }
}
