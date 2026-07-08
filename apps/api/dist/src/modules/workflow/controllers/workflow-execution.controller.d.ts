import { WorkflowService } from '../services/workflow.service';
export declare class WorkflowExecutionController {
    private readonly workflowService;
    constructor(workflowService: WorkflowService);
    getExecution(req: any, id: string): Promise<{
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
    stopExecution(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
