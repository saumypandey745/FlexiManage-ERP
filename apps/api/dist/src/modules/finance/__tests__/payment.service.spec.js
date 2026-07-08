"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const payment_service_1 = require("../services/payment.service");
const payment_repository_1 = require("../repositories/payment.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('PaymentService', () => {
    let service;
    const mockRepo = {
        findPayments: jest.fn().mockResolvedValue([]),
        processPayment: jest.fn().mockResolvedValue({ id: 'pay-1' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                payment_service_1.PaymentService,
                { provide: payment_repository_1.PaymentRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(payment_service_1.PaymentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findPayments).toHaveBeenCalledWith('tenant-1');
    });
    it('should process payment', async () => {
        const dto = { invoiceId: 'inv-1', amount: 100, method: 'CASH', paymentDate: '2026-07-08' };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('pay-1');
        expect(mockRepo.processPayment).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=payment.service.spec.js.map