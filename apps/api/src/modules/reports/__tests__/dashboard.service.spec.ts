import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../services/dashboard.service';
import { DashboardRepository } from '../repositories/dashboard.repository';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockRepo = {
    create: jest.fn().mockResolvedValue({ id: 'dash-1', name: 'Test' }),
    findById: jest.fn().mockResolvedValue({ id: 'dash-1', name: 'Test' }),
    findMany: jest.fn().mockResolvedValue([[{ id: 'dash-1' }], 1]),
    update: jest.fn().mockResolvedValue({ id: 'dash-1' }),
    softDelete: jest.fn().mockResolvedValue({ id: 'dash-1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: DashboardRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a dashboard', async () => {
    const dto = { name: 'Test' };
    const res = await service.create('tenant-1', 'user-1', dto);
    expect(res.id).toBe('dash-1');
  });
});
