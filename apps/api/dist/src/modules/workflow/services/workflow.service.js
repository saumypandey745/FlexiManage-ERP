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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const workflow_repository_1 = require("../repositories/workflow.repository");
const workflow_execution_repository_1 = require("../repositories/workflow-execution.repository");
const workflow_engine_service_1 = require("./workflow-engine.service");
let WorkflowService = class WorkflowService {
    constructor(workflowRepo, executionRepo, engineService) {
        this.workflowRepo = workflowRepo;
        this.executionRepo = executionRepo;
        this.engineService = engineService;
    }
    async create(tenantId, dto) {
        return this.workflowRepo.create(tenantId, dto);
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.workflowRepo.findMany(tenantId, skip, limit);
        return { data, total, page, limit };
    }
    async findOne(tenantId, id) {
        const workflow = await this.workflowRepo.findById(tenantId, id);
        if (!workflow)
            throw new common_1.NotFoundException('Workflow not found');
        return workflow;
    }
    async update(tenantId, id, dto, version) {
        return this.workflowRepo.update(tenantId, id, dto, version);
    }
    async delete(tenantId, id) {
        return this.workflowRepo.softDelete(tenantId, id);
    }
    async publish(tenantId, id, version) {
        return this.workflowRepo.update(tenantId, id, { status: 'PUBLISHED' }, version);
    }
    async run(tenantId, id, triggerData) {
        return this.engineService.startWorkflow(tenantId, id, triggerData);
    }
    async stop(tenantId, executionId) {
        return this.engineService.stopWorkflow(tenantId, executionId);
    }
    async addNode(tenantId, id, dto) {
        return this.workflowRepo.addNode(tenantId, id, dto);
    }
    async addEdge(tenantId, id, dto) {
        return this.workflowRepo.addEdge(tenantId, id, dto);
    }
    async getExecution(tenantId, executionId) {
        const exec = await this.executionRepo.getExecution(tenantId, executionId);
        if (!exec)
            throw new common_1.NotFoundException('Execution not found');
        return exec;
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workflow_repository_1.WorkflowRepository,
        workflow_execution_repository_1.WorkflowExecutionRepository,
        workflow_engine_service_1.WorkflowEngineService])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map