"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const project_service_1 = require("../services/project.service");
const project_repository_1 = require("../repositories/project.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('ProjectService', () => {
    let service;
    const mockRepo = {
        create: jest.fn().mockResolvedValue({ id: 'proj-1', code: 'P1' }),
        findById: jest.fn().mockResolvedValue({ id: 'proj-1', code: 'P1' }),
        findMany: jest.fn().mockResolvedValue([[{ id: 'proj-1' }], 1]),
        update: jest.fn().mockResolvedValue({ id: 'proj-1', name: 'Updated' }),
        softDelete: jest.fn().mockResolvedValue({ id: 'proj-1', deletedAt: new Date() }),
    };
    const mockPrisma = {
        project: {
            findUnique: jest.fn().mockResolvedValue(null),
        },
        task: {
            count: jest.fn().mockResolvedValue(0),
        },
        auditLog: {
            create: jest.fn().mockResolvedValue({}),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                project_service_1.ProjectService,
                { provide: project_repository_1.ProjectRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(project_service_1.ProjectService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a project', async () => {
        const dto = { name: 'Test', code: 'P1' };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('proj-1');
        expect(mockRepo.create).toHaveBeenCalled();
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=project.service.spec.js.map