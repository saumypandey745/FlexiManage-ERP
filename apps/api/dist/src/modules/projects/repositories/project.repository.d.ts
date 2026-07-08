import { PrismaService } from '../../../common/prisma/prisma.service';
import { Project, Prisma } from '@prisma/client';
export declare class ProjectRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProjectCreateInput): Promise<Project>;
    findById(tenantId: string, id: string): Promise<Project | null>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
        where?: Prisma.ProjectWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<[Project[], number]>;
    update(tenantId: string, id: string, data: Prisma.ProjectUpdateInput): Promise<Project>;
    softDelete(tenantId: string, id: string): Promise<Project>;
}
