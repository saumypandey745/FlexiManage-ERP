import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Logger } from '@nestjs/common';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';
import { EmailService } from '../../email/email.service';
import { AiService } from '../../ai/services/ai.service';
import { IntegrationService } from '../../integrations/services/integration.service';

@Processor('workflow-queue')
export class WorkflowProcessor extends WorkerHost {
  private readonly logger = new Logger(WorkflowProcessor.name);

  constructor(
    private readonly executionRepo: WorkflowExecutionRepository,
    private readonly workflowRepo: WorkflowRepository,
    private readonly emailService: EmailService,
    private readonly aiService: AiService,
    private readonly integrationService: IntegrationService,
    @InjectQueue('workflow-queue') private readonly workflowQueue: Queue
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

      // Execute Node Logic
      switch (currentNode.type) {
        case 'ACTION':
          const config: any = currentNode.config || {};
          if (config.actionType === 'send_email') {
             await this.emailService.sendGenericEmail(
                config.to || 'admin@fleximanage.com',
                config.subject || 'Workflow Notification',
                config.body || 'This is an automated workflow email.'
             );
          } else if (config.actionType === 'ai_generate') {
             await this.aiService.chat(tenantId, 'system', {
                message: config.prompt || 'Hello'
             });
          }
          break;
        case 'CONDITION':
          // Evaluated at edge
          break;
        case 'WAIT':
          // Re-queue with delay
          const waitConfig: any = currentNode.config || {};
          if (waitConfig.delayMs) {
            // Find edges and schedule them with delay
            const edges = workflow.edges.filter(e => e.sourceId === nodeId);
            for (const edge of edges) {
              await this.workflowQueue.add('execute-workflow', {
                tenantId, executionId, workflowId, nodeId: edge.targetId
              }, { delay: waitConfig.delayMs, jobId: `${executionId}-${edge.targetId}` });
            }
            return; // Stop here, since we rescheduled
          }
          break;
      }

      // Find next node via outgoing edges
      const edges = workflow.edges.filter(e => e.sourceId === nodeId);
      if (edges.length === 0) {
        // End of workflow path
        await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
        await this.executionRepo.addLog(tenantId, executionId, 'INFO', 'Workflow execution completed successfully');
      } else {
        // Enqueue next nodes
        let enqueuedAny = false;
        for (const edge of edges) {
          let conditionMet = true;
          if (edge.condition && currentNode.type === 'CONDITION') {
             // Basic strict equality condition evaluation mock for real prod execution
             const condition: any = edge.condition;
             conditionMet = (condition.operator === 'equals'); // Simplified
          }
          if (conditionMet) {
             this.logger.log(`Queueing next node: ${edge.targetId}`);
             await this.workflowQueue.add('execute-workflow', {
                tenantId,
                executionId,
                workflowId,
                nodeId: edge.targetId
             }, { jobId: `${executionId}-${edge.targetId}` });
             enqueuedAny = true;
          }
        }
        if (!enqueuedAny) {
           await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to process workflow job: ${error.message}`, error.stack);
      await this.executionRepo.updateStatus(tenantId, executionId, 'FAILED', new Date());
      await this.executionRepo.addLog(tenantId, executionId, 'ERROR', `Workflow execution failed: ${error.message}`, nodeId, { stack: error.stack });
      throw error;
    }
  }
}
