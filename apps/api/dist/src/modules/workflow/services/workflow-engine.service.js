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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WorkflowEngineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowEngineService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const workflow_execution_repository_1 = require("../repositories/workflow-execution.repository");
const workflow_repository_1 = require("../repositories/workflow.repository");
let WorkflowEngineService = WorkflowEngineService_1 = class WorkflowEngineService {
    constructor(executionRepo, workflowRepo, workflowQueue) {
        this.executionRepo = executionRepo;
        this.workflowRepo = workflowRepo;
        this.workflowQueue = workflowQueue;
        this.logger = new common_1.Logger(WorkflowEngineService_1.name);
    }
    async startWorkflow(tenantId, workflowId, triggerData) {
        const workflow = await this.workflowRepo.findById(tenantId, workflowId);
        if (!workflow || workflow.status !== 'PUBLISHED') {
            throw new Error('Workflow is not published or not found');
        }
        const triggerNodes = workflow.nodes.filter(n => n.type === 'TRIGGER');
        if (triggerNodes.length === 0) {
            throw new Error('No trigger nodes found in workflow');
        }
        const execution = await this.executionRepo.createExecution(tenantId, workflow.id, triggerData);
        await this.executionRepo.addLog(tenantId, execution.id, 'INFO', 'Workflow execution initiated');
        await this.workflowQueue.add('execute-workflow', {
            tenantId,
            executionId: execution.id,
            workflowId: workflow.id,
            nodeId: triggerNodes[0].id
        }, {
            jobId: `${execution.id}-start`,
            removeOnComplete: true,
            removeOnFail: false
        });
        return execution;
    }
    async stopWorkflow(tenantId, executionId) {
        await this.executionRepo.updateStatus(tenantId, executionId, 'CANCELLED');
        await this.executionRepo.addLog(tenantId, executionId, 'WARN', 'Workflow execution cancelled by user');
        return { success: true };
    }
};
exports.WorkflowEngineService = WorkflowEngineService;
exports.WorkflowEngineService = WorkflowEngineService = WorkflowEngineService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('workflow-queue')),
    __metadata("design:paramtypes", [workflow_execution_repository_1.WorkflowExecutionRepository,
        workflow_repository_1.WorkflowRepository,
        bullmq_2.Queue])
], WorkflowEngineService);
//# sourceMappingURL=workflow-engine.service.js.map