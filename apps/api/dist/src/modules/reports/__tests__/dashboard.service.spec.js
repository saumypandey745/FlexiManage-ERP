"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const dashboard_service_1 = require("../services/dashboard.service");
const dashboard_repository_1 = require("../repositories/dashboard.repository");
describe('DashboardService', () => {
    let service;
    const mockRepo = {
        create: jest.fn().mockResolvedValue({ id: 'dash-1', name: 'Test' }),
        findById: jest.fn().mockResolvedValue({ id: 'dash-1', name: 'Test' }),
        findMany: jest.fn().mockResolvedValue([[{ id: 'dash-1' }], 1]),
        update: jest.fn().mockResolvedValue({ id: 'dash-1' }),
        softDelete: jest.fn().mockResolvedValue({ id: 'dash-1' }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                dashboard_service_1.DashboardService,
                { provide: dashboard_repository_1.DashboardRepository, useValue: mockRepo },
            ],
        }).compile();
        service = module.get(dashboard_service_1.DashboardService);
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
//# sourceMappingURL=dashboard.service.spec.js.map