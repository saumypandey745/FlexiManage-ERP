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
exports.AiVectorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AiVectorRepository = class AiVectorRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveDocument(tenantId, dto) {
        return this.prisma.aiDocument.create({
            data: {
                tenantId,
                title: dto.title,
                content: dto.content,
                sourceType: dto.sourceType,
                sourceId: dto.sourceId,
                metadata: dto.metadata || {}
            }
        });
    }
    async saveEmbedding(tenantId, documentId, content, chunkIndex, vectorArray) {
        const vectorString = `[${vectorArray.join(',')}]`;
        await this.prisma.$executeRaw `
      INSERT INTO "AiEmbedding" ("id", "tenantId", "documentId", "chunkIndex", "content", "vector", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${tenantId}::uuid, ${documentId}::uuid, ${chunkIndex}, ${content}, ${vectorString}::vector, NOW(), NOW())
    `;
    }
    async similaritySearch(tenantId, queryVector, limit = 5) {
        const vectorString = `[${queryVector.join(',')}]`;
        const results = await this.prisma.$queryRaw `
      SELECT "documentId", "content", 1 - ("vector" <=> ${vectorString}::vector) as similarity
      FROM "AiEmbedding"
      WHERE "tenantId" = ${tenantId}::uuid
      ORDER BY "vector" <=> ${vectorString}::vector
      LIMIT ${limit}
    `;
        return results;
    }
};
exports.AiVectorRepository = AiVectorRepository;
exports.AiVectorRepository = AiVectorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiVectorRepository);
//# sourceMappingURL=ai-vector.repository.js.map