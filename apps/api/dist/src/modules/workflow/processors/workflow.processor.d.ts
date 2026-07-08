import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';
export declare class WorkflowProcessor extends WorkerHost {
    private readonly executionRepo;
    private readonly workflowRepo;
    private readonly logger;
    constructor(executionRepo: WorkflowExecutionRepository, workflowRepo: WorkflowRepository);
    process(job: Job<any, any, string>): Promise<any>;
}
