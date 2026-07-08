"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const report_service_1 = require("../services/report.service");
const report_repository_1 = require("../repositories/report.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const report_dto_1 = require("../dto/report.dto");
describe('ReportService', () => {
    let service;
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                report_service_1.ReportService,
                { provide: report_repository_1.ReportRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(report_service_1.ReportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a report', async () => {
        const dto = {
            name: 'Test',
            type: report_dto_1.ReportType.STANDARD,
            queryConfig: {},
            columns: {}
        };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('rep-1');
        expect(mockRepo.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=report.service.spec.js.map