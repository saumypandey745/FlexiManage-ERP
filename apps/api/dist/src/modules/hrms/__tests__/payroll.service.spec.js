"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const payroll_service_1 = require("../services/payroll.service");
const payroll_repository_1 = require("../repositories/payroll.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('PayrollService', () => {
    let service;
    const mockRepo = {
        findPayrolls: jest.fn().mockResolvedValue([]),
        generatePayroll: jest.fn().mockResolvedValue({ id: 'payroll-1' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                payroll_service_1.PayrollService,
                { provide: payroll_repository_1.PayrollRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(payroll_service_1.PayrollService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findPayrolls).toHaveBeenCalledWith('tenant-1');
    });
    it('should generate payroll', async () => {
        const dto = { month: 7, year: 2026 };
        const res = await service.generate('tenant-1', 'user-1', 'emp-1', dto);
        expect(res.id).toBe('payroll-1');
        expect(mockRepo.generatePayroll).toHaveBeenCalledWith('tenant-1', 'emp-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=payroll.service.spec.js.map