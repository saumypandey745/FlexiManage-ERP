import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateWorkflowDto, UpdateWorkflowDto, CreateWorkflowNodeDto, CreateWorkflowEdgeDto } from '../dto/workflow.dto';
import { Workflow, WorkflowNode, WorkflowEdge } from '@prisma/client';
export declare class WorkflowRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, dto: CreateWorkflowDto): Promise<Workflow>;
    findMany(tenantId: string, skip?: number, take?: number): Promise<[Workflow[], number]>;
    findById(tenantId: string, id: string): Promise<({
        nodes: {
            type: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            positionX: number;
            positionY: number;
            config: import("@prisma/client/runtime/library").JsonValue | null;
            workflowId: string;
        }[];
        edges: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            sourceId: string;
            targetId: string;
            condition: string | null;
            workflowId: string;
        }[];
    } & {
        code: string;
        status: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isActive: boolean;
    }) | null>;
    update(tenantId: string, id: string, dto: UpdateWorkflowDto, currentVersion: number): Promise<Workflow>;
    addNode(tenantId: string, workflowId: string, dto: CreateWorkflowNodeDto): Promise<WorkflowNode>;
    addEdge(tenantId: string, workflowId: string, dto: CreateWorkflowEdgeDto): Promise<WorkflowEdge>;
    softDelete(tenantId: string, id: string): Promise<{
        code: string;
        status: string;
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        version: number;
        isActive: boolean;
    }>;
}
