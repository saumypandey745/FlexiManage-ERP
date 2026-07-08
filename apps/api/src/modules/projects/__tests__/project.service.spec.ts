import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../services/project.service';
import { ProjectRepository } from '../repositories/project.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('ProjectService', () => {
  let service: ProjectService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: ProjectRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
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
