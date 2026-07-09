import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowEngineService } from "../services/workflow-engine.service";
import { WorkflowRepository } from "../repositories/workflow.repository";
import { WorkflowExecutionRepository } from "../repositories/workflow-execution.repository";

describe("WorkflowService", () => {
  let service: WorkflowService;

  const mockRepo = {
    create: jest.fn().mockResolvedValue({ id: "wf-1", name: "Test Workflow" }),
    findById: jest
      .fn()
      .mockResolvedValue({ id: "wf-1", name: "Test Workflow" }),
  };

  const mockExecRepo = {
    getExecution: jest.fn().mockResolvedValue({ id: "exec-1" }),
  };

  const mockEngine = {
    startWorkflow: jest.fn().mockResolvedValue({ id: "exec-1" }),
    stopWorkflow: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowService,
        { provide: WorkflowRepository, useValue: mockRepo },
        { provide: WorkflowExecutionRepository, useValue: mockExecRepo },
        { provide: WorkflowEngineService, useValue: mockEngine },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a workflow", async () => {
    const res = await service.create("tenant-1", {
      code: "TEST",
      name: "Test Workflow",
    });
    expect(res.id).toBe("wf-1");
  });

  it("should run a workflow", async () => {
    const res = await service.run("tenant-1", "wf-1", { some: "data" });
    expect(res.id).toBe("exec-1");
    expect(mockEngine.startWorkflow).toHaveBeenCalledWith("tenant-1", "wf-1", {
      some: "data",
    });
  });
});
