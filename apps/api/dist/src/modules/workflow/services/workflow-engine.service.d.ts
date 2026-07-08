import { Queue } from 'bullmq';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';
export declare class WorkflowEngineService {
    private readonly executionRepo;
    private readonly workflowRepo;
    private readonly workflowQueue;
    private readonly logger;
    constructor(executionRepo: WorkflowExecutionRepository, workflowRepo: WorkflowRepository, workflowQueue: Queue);
    startWorkflow(tenantId: string, workflowId: string, triggerData?: any): Promise<{
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
    stopWorkflow(tenantId: string, executionId: string): Promise<{
        success: boolean;
    }>;
}
