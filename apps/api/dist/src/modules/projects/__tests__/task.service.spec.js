"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const task_service_1 = require("../services/task.service");
const task_repository_1 = require("../repositories/task.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('TaskService', () => {
    let service;
    const mockRepo = {
        create: jest.fn().mockResolvedValue({ id: 'task-1', code: 'T1' }),
        findById: jest.fn().mockResolvedValue({ id: 'task-1', status: 'TODO' }),
        findMany: jest.fn().mockResolvedValue([[{ id: 'task-1' }], 1]),
        update: jest.fn().mockResolvedValue({ id: 'task-1', title: 'Updated' }),
        softDelete: jest.fn().mockResolvedValue({ id: 'task-1', deletedAt: new Date() }),
    };
    const mockPrisma = {
        project: {
            findUnique: jest.fn().mockResolvedValue({ id: 'proj-1' }),
        },
        task: {
            findUnique: jest.fn().mockResolvedValue(null),
        },
        user: {
            findUnique: jest.fn().mockResolvedValue({ id: 'user-1', status: 'ACTIVE' }),
        },
        taskDependency: {
            findMany: jest.fn().mockResolvedValue([]),
        },
        auditLog: {
            create: jest.fn().mockResolvedValue({}),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                task_service_1.TaskService,
                { provide: task_repository_1.TaskRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(task_service_1.TaskService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a task', async () => {
        const dto = { projectId: 'proj-1', code: 'T1', title: 'Test Task' };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('task-1');
        expect(mockRepo.create).toHaveBeenCalled();
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=task.service.spec.js.map