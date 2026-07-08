import { PrismaService } from '../../../common/prisma/prisma.service';
import { WorkflowExecution, WorkflowLog } from '@prisma/client';
export declare class WorkflowExecutionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createExecution(tenantId: string, workflowId: string, triggerData?: any): Promise<WorkflowExecution>;
    getExecution(tenantId: string, id: string): Promise<WorkflowExecution | null>;
    updateStatus(tenantId: string, id: string, status: string, completedAt?: Date): Promise<{
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
    setVariable(tenantId: string, executionId: string, key: string, value: any): Promise<{
        value: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        executionId: string;
        key: string;
    }>;
    addLog(tenantId: string, executionId: string, level: string, message: string, nodeId?: string, details?: any): Promise<WorkflowLog>;
}
