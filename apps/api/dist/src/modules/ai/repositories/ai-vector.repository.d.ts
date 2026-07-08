import { PrismaService } from '../../../common/prisma/prisma.service';
import { EmbedDocumentDto } from '../dto/ai.dto';
import { AiDocument } from '@prisma/client';
export declare class AiVectorRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    saveDocument(tenantId: string, dto: EmbedDocumentDto): Promise<AiDocument>;
    saveEmbedding(tenantId: string, documentId: string, content: string, chunkIndex: number, vectorArray: number[]): Promise<void>;
    similaritySearch(tenantId: string, queryVector: number[], limit?: number): Promise<unknown>;
}
