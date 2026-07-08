import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';

@Processor('workflow-queue')
export class WorkflowProcessor extends WorkerHost {
  private readonly logger = new Logger(WorkflowProcessor.name);

  constructor(
    private readonly executionRepo: WorkflowExecutionRepository,
    private readonly workflowRepo: WorkflowRepository
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { tenantId, executionId, workflowId, nodeId } = job.data;

    try {
      await this.executionRepo.updateStatus(tenantId, executionId, 'RUNNING');
      
      const workflow = await this.workflowRepo.findById(tenantId, workflowId);
      if (!workflow) throw new Error('Workflow not found');

      const currentNode = workflow.nodes.find(n => n.id === nodeId);
      if (!currentNode) {
        await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
        return;
      }

      await this.executionRepo.addLog(tenantId, executionId, 'INFO', `Executing node ${currentNode.name} (${currentNode.type})`, currentNode.id);

      // Node Execution Logic (Switch case based on type)
      switch (currentNode.type) {
        case 'ACTION':
          // Handle specific action logic based on config
          break;
        case 'CONDITION':
          // Evaluate condition logic
          break;
        case 'WAIT':
          // Suspend and schedule a wake-up
          break;
      }

      // Find next node via outgoing edges
      const edges = workflow.edges.filter(e => e.sourceId === nodeId);
      if (edges.length === 0) {
        // End of workflow
        await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
        await this.executionRepo.addLog(tenantId, executionId, 'INFO', 'Workflow execution completed successfully');
      } else {
        // Enqueue next nodes (Parallel or Single)
        for (const edge of edges) {
          // Check condition if exists
          let conditionMet = true;
          if (edge.condition) {
            // Evaluate condition here
          }
          if (conditionMet) {
             // In real world, we inject this back into the queue
             this.logger.log(`Queueing next node: ${edge.targetId}`);
             // For mock implementation, we log and complete.
          }
        }
        await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
      }
    } catch (error: any) {
      this.logger.error(`Failed to process workflow job: ${error.message}`, error.stack);
      await this.executionRepo.updateStatus(tenantId, executionId, 'FAILED', new Date());
      await this.executionRepo.addLog(tenantId, executionId, 'ERROR', `Workflow execution failed: ${error.message}`, nodeId, { stack: error.stack });
      throw error;
    }
  }
}
