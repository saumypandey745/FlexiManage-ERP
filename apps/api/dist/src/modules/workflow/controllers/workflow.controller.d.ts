import { WorkflowService } from '../services/workflow.service';
import { CreateWorkflowDto, UpdateWorkflowDto, CreateWorkflowNodeDto, CreateWorkflowEdgeDto, TriggerWorkflowDto } from '../dto/workflow.dto';
export declare class WorkflowController {
    private readonly workflowService;
    constructor(workflowService: WorkflowService);
    create(req: any, dto: CreateWorkflowDto): Promise<{
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
    findAll(req: any, page?: number, limit?: number): Promise<{
        data: {
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
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(req: any, id: string): Promise<{
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
    }>;
    update(req: any, id: string, dto: UpdateWorkflowDto, version: string): Promise<{
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
    remove(req: any, id: string): Promise<{
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
    addNode(req: any, id: string, dto: CreateWorkflowNodeDto): Promise<{
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
    }>;
    addEdge(req: any, id: string, dto: CreateWorkflowEdgeDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        sourceId: string;
        targetId: string;
        condition: string | null;
        workflowId: string;
    }>;
    publish(req: any, id: string, version: string): Promise<{
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
    run(req: any, id: string, dto: TriggerWorkflowDto): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        startedAt: Date | null;
        triggerData: import("@prisma/client/runtime/library").JsonValue | null;
        workflowId: string;
    }>;
}
