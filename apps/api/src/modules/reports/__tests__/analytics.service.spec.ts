import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../services/analytics.service';
import { AnalyticsRepository } from '../repositories/analytics.repository';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  const mockRepo = {
    findMetrics: jest.fn().mockResolvedValue([{ id: 'metric-1', name: 'Revenue' }]),
    findSnapshots: jest.fn().mockResolvedValue([{ id: 'snap-1', value: 100 }]),
    trackEvent: jest.fn().mockResolvedValue({ id: 'event-1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: AnalyticsRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should track an event', async () => {
    const res = await service.trackEvent('tenant-1', 'LOGIN', {}, 'web', 'user-1');
    expect(res.id).toBe('event-1');
  });
});
