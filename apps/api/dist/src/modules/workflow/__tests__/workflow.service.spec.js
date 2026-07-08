"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const workflow_service_1 = require("../services/workflow.service");
const workflow_engine_service_1 = require("../services/workflow-engine.service");
const workflow_repository_1 = require("../repositories/workflow.repository");
const workflow_execution_repository_1 = require("../repositories/workflow-execution.repository");
describe('WorkflowService', () => {
    let service;
    const mockRepo = {
        create: jest.fn().mockResolvedValue({ id: 'wf-1', name: 'Test Workflow' }),
        findById: jest.fn().mockResolvedValue({ id: 'wf-1', name: 'Test Workflow' }),
    };
    const mockExecRepo = {
        getExecution: jest.fn().mockResolvedValue({ id: 'exec-1' }),
    };
    const mockEngine = {
        startWorkflow: jest.fn().mockResolvedValue({ id: 'exec-1' }),
        stopWorkflow: jest.fn().mockResolvedValue({ success: true }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                workflow_service_1.WorkflowService,
                { provide: workflow_repository_1.WorkflowRepository, useValue: mockRepo },
                { provide: workflow_execution_repository_1.WorkflowExecutionRepository, useValue: mockExecRepo },
                { provide: workflow_engine_service_1.WorkflowEngineService, useValue: mockEngine },
            ],
        }).compile();
        service = module.get(workflow_service_1.WorkflowService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a workflow', async () => {
        const res = await service.create('tenant-1', { code: 'TEST', name: 'Test Workflow' });
        expect(res.id).toBe('wf-1');
    });
    it('should run a workflow', async () => {
        const res = await service.run('tenant-1', 'wf-1', { some: 'data' });
        expect(res.id).toBe('exec-1');
        expect(mockEngine.startWorkflow).toHaveBeenCalledWith('tenant-1', 'wf-1', { some: 'data' });
    });
});
//# sourceMappingURL=workflow.service.spec.js.map