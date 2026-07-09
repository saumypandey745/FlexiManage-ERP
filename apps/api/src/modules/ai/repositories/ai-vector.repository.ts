import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { EmbedDocumentDto } from "../dto/ai.dto";
import { AiDocument } from "@prisma/client";

@Injectable()
export class AiVectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveDocument(
    tenantId: string,
    dto: EmbedDocumentDto
  ): Promise<AiDocument> {
    return this.prisma.aiDocument.create({
      data: {
        tenantId,
        title: dto.title,
        content: dto.content,
        sourceType: dto.sourceType,
        sourceId: dto.sourceId,
        metadata: dto.metadata || {},
      },
    });
  }

  async saveEmbedding(
    tenantId: string,
    documentId: string,
    content: string,
    chunkIndex: number,
    vectorArray: number[]
  ) {
    // We use a raw query because Prisma doesn't natively support pgvector insertion via standard API yet,
    // unless typed as Unsupported("vector(1536)").
    const vectorString = `[${vectorArray.join(",")}]`;

    await this.prisma.$executeRaw`
      INSERT INTO "AiEmbedding" ("id", "tenantId", "documentId", "chunkIndex", "content", "vector", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${tenantId}::uuid, ${documentId}::uuid, ${chunkIndex}, ${content}, ${vectorString}::vector, NOW(), NOW())
    `;
  }

  async similaritySearch(tenantId: string, queryVector: number[], limit = 5) {
    const vectorString = `[${queryVector.join(",")}]`;

    const results = await this.prisma.$queryRaw`
      SELECT "documentId", "content", 1 - ("vector" <=> ${vectorString}::vector) as similarity
      FROM "AiEmbedding"
      WHERE "tenantId" = ${tenantId}::uuid
      ORDER BY "vector" <=> ${vectorString}::vector
      LIMIT ${limit}
    `;

    return results;
  }
}
