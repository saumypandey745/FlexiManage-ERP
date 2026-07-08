import { PrismaService } from '../../../common/prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
export declare class TaskRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TaskCreateInput): Promise<Task>;
    findById(tenantId: string, id: string): Promise<Task | null>;
    findMany(tenantId: string, params: {
        skip?: number;
        take?: number;
        where?: Prisma.TaskWhereInput;
        orderBy?: Prisma.TaskOrderByWithRelationInput;
    }): Promise<[Task[], number]>;
    update(tenantId: string, id: string, data: Prisma.TaskUpdateInput): Promise<Task>;
    softDelete(tenantId: string, id: string): Promise<Task>;
}
