"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const analytics_service_1 = require("../services/analytics.service");
const analytics_repository_1 = require("../repositories/analytics.repository");
describe('AnalyticsService', () => {
    let service;
    const mockRepo = {
        findMetrics: jest.fn().mockResolvedValue([{ id: 'metric-1', name: 'Revenue' }]),
        findSnapshots: jest.fn().mockResolvedValue([{ id: 'snap-1', value: 100 }]),
        trackEvent: jest.fn().mockResolvedValue({ id: 'event-1' }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                analytics_service_1.AnalyticsService,
                { provide: analytics_repository_1.AnalyticsRepository, useValue: mockRepo },
            ],
        }).compile();
        service = module.get(analytics_service_1.AnalyticsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should track an event', async () => {
        const res = await service.trackEvent('tenant-1', 'LOGIN', {}, 'web', 'user-1');
        expect(res.id).toBe('event-1');
    });
});
//# sourceMappingURL=analytics.service.spec.js.map