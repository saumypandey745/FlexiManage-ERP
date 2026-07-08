import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';

@Injectable()
export class WorkflowEngineService {
  private readonly logger = new Logger(WorkflowEngineService.name);

  constructor(
    private readonly executionRepo: WorkflowExecutionRepository,
    private readonly workflowRepo: WorkflowRepository,
    @InjectQueue('workflow-queue') private readonly workflowQueue: Queue
  ) {}

  async startWorkflow(tenantId: string, workflowId: string, triggerData?: any) {
    const workflow = await this.workflowRepo.findById(tenantId, workflowId);
    if (!workflow || workflow.status !== 'PUBLISHED') {
      throw new Error('Workflow is not published or not found');
    }

    // Find trigger nodes
    const triggerNodes = workflow.nodes.filter(n => n.type === 'TRIGGER');
    if (triggerNodes.length === 0) {
      throw new Error('No trigger nodes found in workflow');
    }

    const execution = await this.executionRepo.createExecution(tenantId, workflow.id, triggerData);
    await this.executionRepo.addLog(tenantId, execution.id, 'INFO', 'Workflow execution initiated');

    // Add job to BullMQ queue for processing
    await this.workflowQueue.add('execute-workflow', {
      tenantId,
      executionId: execution.id,
      workflowId: workflow.id,
      nodeId: triggerNodes[0].id // start at first trigger
    }, {
      jobId: `${execution.id}-start`,
      removeOnComplete: true,
      removeOnFail: false
    });

    return execution;
  }

  async stopWorkflow(tenantId: string, executionId: string) {
    await this.executionRepo.updateStatus(tenantId, executionId, 'CANCELLED');
    await this.executionRepo.addLog(tenantId, executionId, 'WARN', 'Workflow execution cancelled by user');
    return { success: true };
  }
}
