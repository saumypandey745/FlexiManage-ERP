"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WorkflowProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const workflow_execution_repository_1 = require("../repositories/workflow-execution.repository");
const workflow_repository_1 = require("../repositories/workflow.repository");
let WorkflowProcessor = WorkflowProcessor_1 = class WorkflowProcessor extends bullmq_1.WorkerHost {
    constructor(executionRepo, workflowRepo) {
        super();
        this.executionRepo = executionRepo;
        this.workflowRepo = workflowRepo;
        this.logger = new common_1.Logger(WorkflowProcessor_1.name);
    }
    async process(job) {
        const { tenantId, executionId, workflowId, nodeId } = job.data;
        try {
            await this.executionRepo.updateStatus(tenantId, executionId, 'RUNNING');
            const workflow = await this.workflowRepo.findById(tenantId, workflowId);
            if (!workflow)
                throw new Error('Workflow not found');
            const currentNode = workflow.nodes.find(n => n.id === nodeId);
            if (!currentNode) {
                await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
                return;
            }
            await this.executionRepo.addLog(tenantId, executionId, 'INFO', `Executing node ${currentNode.name} (${currentNode.type})`, currentNode.id);
            switch (currentNode.type) {
                case 'ACTION':
                    break;
                case 'CONDITION':
                    break;
                case 'WAIT':
                    break;
            }
            const edges = workflow.edges.filter(e => e.sourceId === nodeId);
            if (edges.length === 0) {
                await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
                await this.executionRepo.addLog(tenantId, executionId, 'INFO', 'Workflow execution completed successfully');
            }
            else {
                for (const edge of edges) {
                    let conditionMet = true;
                    if (edge.condition) {
                    }
                    if (conditionMet) {
                        this.logger.log(`Queueing next node: ${edge.targetId}`);
                    }
                }
                await this.executionRepo.updateStatus(tenantId, executionId, 'COMPLETED', new Date());
            }
        }
        catch (error) {
            this.logger.error(`Failed to process workflow job: ${error.message}`, error.stack);
            await this.executionRepo.updateStatus(tenantId, executionId, 'FAILED', new Date());
            await this.executionRepo.addLog(tenantId, executionId, 'ERROR', `Workflow execution failed: ${error.message}`, nodeId, { stack: error.stack });
            throw error;
        }
    }
};
exports.WorkflowProcessor = WorkflowProcessor;
exports.WorkflowProcessor = WorkflowProcessor = WorkflowProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('workflow-queue'),
    __metadata("design:paramtypes", [workflow_execution_repository_1.WorkflowExecutionRepository,
        workflow_repository_1.WorkflowRepository])
], WorkflowProcessor);
//# sourceMappingURL=workflow.processor.js.map