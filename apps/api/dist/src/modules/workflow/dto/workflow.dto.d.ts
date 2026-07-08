export declare enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export declare enum WorkflowNodeType {
    TRIGGER = "TRIGGER",
    ACTION = "ACTION",
    CONDITION = "CONDITION",
    PARALLEL = "PARALLEL",
    APPROVAL = "APPROVAL",
    WAIT = "WAIT"
}
export declare enum WorkflowExecutionStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    SUSPENDED = "SUSPENDED",
    CANCELLED = "CANCELLED"
}
export declare class CreateWorkflowDto {
    code: string;
    name: string;
    description?: string;
}
export declare class UpdateWorkflowDto {
    name?: string;
    description?: string;
    status?: WorkflowStatus;
}
export declare class CreateWorkflowNodeDto {
    type: WorkflowNodeType;
    name: string;
    config?: Record<string, any>;
    positionX?: number;
    positionY?: number;
}
export declare class CreateWorkflowEdgeDto {
    sourceId: string;
    targetId: string;
    condition?: string;
}
export declare class TriggerWorkflowDto {
    triggerData?: Record<string, any>;
}
