import { PrismaService } from '../../../common/prisma/prisma.service';
import { AiPromptTemplate } from '@prisma/client';
import { CreateTemplateDto } from '../dto/ai.dto';
export declare class AiPromptRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, dto: CreateTemplateDto): Promise<AiPromptTemplate>;
    findByCode(tenantId: string, code: string): Promise<AiPromptTemplate | null>;
    findAll(tenantId: string): Promise<AiPromptTemplate[]>;
}
