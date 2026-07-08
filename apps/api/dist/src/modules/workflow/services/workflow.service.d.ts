import { WorkflowRepository } from '../repositories/workflow.repository';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { CreateWorkflowDto, UpdateWorkflowDto, CreateWorkflowNodeDto, CreateWorkflowEdgeDto } from '../dto/workflow.dto';
import { WorkflowEngineService } from './workflow-engine.service';
export declare class WorkflowService {
    private readonly workflowRepo;
    private readonly executionRepo;
    private readonly engineService;
    constructor(workflowRepo: WorkflowRepository, executionRepo: WorkflowExecutionRepository, engineService: WorkflowEngineService);
    create(tenantId: string, dto: CreateWorkflowDto): Promise<{
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
    findAll(tenantId: string, page?: number, limit?: number): Promise<{
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
    findOne(tenantId: string, id: string): Promise<{
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
    update(tenantId: string, id: string, dto: UpdateWorkflowDto, version: number): Promise<{
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
    delete(tenantId: string, id: string): Promise<{
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
    publish(tenantId: string, id: string, version: number): Promise<{
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
    run(tenantId: string, id: string, triggerData?: any): Promise<{
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
    stop(tenantId: string, executionId: string): Promise<{
        success: boolean;
    }>;
    addNode(tenantId: string, id: string, dto: CreateWorkflowNodeDto): Promise<{
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
    addEdge(tenantId: string, id: string, dto: CreateWorkflowEdgeDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        sourceId: string;
        targetId: string;
        condition: string | null;
        workflowId: string;
    }>;
    getExecution(tenantId: string, executionId: string): Promise<{
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
