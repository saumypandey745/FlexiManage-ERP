import { Test, TestingModule } from "@nestjs/testing";
import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repositories/task.repository";
import { PrismaService } from "../../../common/prisma/prisma.service";

describe("TaskService", () => {
  let service: TaskService;

  const mockRepo = {
    create: jest.fn().mockResolvedValue({ id: "task-1", code: "T1" }),
    findById: jest.fn().mockResolvedValue({ id: "task-1", status: "TODO" }),
    findMany: jest.fn().mockResolvedValue([[{ id: "task-1" }], 1]),
    update: jest.fn().mockResolvedValue({ id: "task-1", title: "Updated" }),
    softDelete: jest
      .fn()
      .mockResolvedValue({ id: "task-1", deletedAt: new Date() }),
  };

  const mockPrisma = {
    project: {
      findUnique: jest.fn().mockResolvedValue({ id: "proj-1" }),
    },
    task: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    user: {
      findUnique: jest
        .fn()
        .mockResolvedValue({ id: "user-1", status: "ACTIVE" }),
    },
    taskDependency: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    auditLog: {
      create: jest.fn().mockResolvedValue({}),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a task", async () => {
    const dto = { projectId: "proj-1", code: "T1", title: "Test Task" };
    const res = await service.create("tenant-1", "user-1", dto);
    expect(res.id).toBe("task-1");
    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
