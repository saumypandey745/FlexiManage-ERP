import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkflowRepository } from '../repositories/workflow.repository';
import { WorkflowExecutionRepository } from '../repositories/workflow-execution.repository';
import { CreateWorkflowDto, UpdateWorkflowDto, CreateWorkflowNodeDto, CreateWorkflowEdgeDto } from '../dto/workflow.dto';
import { WorkflowEngineService } from './workflow-engine.service';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly workflowRepo: WorkflowRepository,
    private readonly executionRepo: WorkflowExecutionRepository,
    private readonly engineService: WorkflowEngineService
  ) {}

  async create(tenantId: string, dto: CreateWorkflowDto) {
    return this.workflowRepo.create(tenantId, dto);
  }

  async findAll(tenantId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.workflowRepo.findMany(tenantId, skip, limit);
    return { data, total, page, limit };
  }

  async findOne(tenantId: string, id: string) {
    const workflow = await this.workflowRepo.findById(tenantId, id);
    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async update(tenantId: string, id: string, dto: UpdateWorkflowDto, version: number) {
    return this.workflowRepo.update(tenantId, id, dto, version);
  }

  async delete(tenantId: string, id: string) {
    return this.workflowRepo.softDelete(tenantId, id);
  }

  async publish(tenantId: string, id: string, version: number) {
    return this.workflowRepo.update(tenantId, id, { status: 'PUBLISHED' } as any, version);
  }

  async run(tenantId: string, id: string, triggerData?: any) {
    return this.engineService.startWorkflow(tenantId, id, triggerData);
  }

  async stop(tenantId: string, executionId: string) {
    return this.engineService.stopWorkflow(tenantId, executionId);
  }

  async addNode(tenantId: string, id: string, dto: CreateWorkflowNodeDto) {
    return this.workflowRepo.addNode(tenantId, id, dto);
  }

  async addEdge(tenantId: string, id: string, dto: CreateWorkflowEdgeDto) {
    return this.workflowRepo.addEdge(tenantId, id, dto);
  }

  async getExecution(tenantId: string, executionId: string) {
    const exec = await this.executionRepo.getExecution(tenantId, executionId);
    if (!exec) throw new NotFoundException('Execution not found');
    return exec;
  }
}
