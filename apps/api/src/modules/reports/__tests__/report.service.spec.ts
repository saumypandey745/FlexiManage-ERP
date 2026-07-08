import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from '../services/report.service';
import { ReportRepository } from '../repositories/report.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ReportType } from '../dto/report.dto';

describe('ReportService', () => {
  let service: ReportService;

  const mockRepo = {
    create: jest.fn().mockResolvedValue({ id: 'rep-1', name: 'Test' }),
    findById: jest.fn().mockResolvedValue({ id: 'rep-1', name: 'Test' }),
    findMany: jest.fn().mockResolvedValue([[{ id: 'rep-1' }], 1]),
    update: jest.fn().mockResolvedValue({ id: 'rep-1' }),
    softDelete: jest.fn().mockResolvedValue({ id: 'rep-1' }),
    createExecution: jest.fn().mockResolvedValue({ id: 'exec-1' }),
  };

  const mockPrisma = {
    reportAudit: {
      create: jest.fn().mockResolvedValue({ id: 'audit-1' }),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        { provide: ReportRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a report', async () => {
    const dto = {
      name: 'Test',
      type: ReportType.STANDARD,
      queryConfig: {},
      columns: {}
    };
    const res = await service.create('tenant-1', 'user-1', dto);
    expect(res.id).toBe('rep-1');
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
