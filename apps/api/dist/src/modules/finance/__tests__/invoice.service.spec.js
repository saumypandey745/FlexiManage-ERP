"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const invoice_service_1 = require("../services/invoice.service");
const invoice_repository_1 = require("../repositories/invoice.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('InvoiceService', () => {
    let service;
    const mockRepo = {
        findInvoices: jest.fn().mockResolvedValue([]),
        createInvoice: jest.fn().mockResolvedValue({ id: 'inv-1' }),
        findById: jest.fn().mockResolvedValue({ id: 'inv-1', status: 'DRAFT' }),
        updateStatus: jest.fn().mockResolvedValue({ id: 'inv-1', status: 'SENT' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                invoice_service_1.InvoiceService,
                { provide: invoice_repository_1.InvoiceRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(invoice_service_1.InvoiceService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findInvoices).toHaveBeenCalledWith('tenant-1');
    });
    it('should create', async () => {
        const dto = { customerId: 'cust-1', invoiceNumber: 'INV-001', issueDate: '2026-07-08', dueDate: '2026-08-08', lines: [] };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('inv-1');
        expect(mockRepo.createInvoice).toHaveBeenCalledWith('tenant-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
    it('should send', async () => {
        const res = await service.send('tenant-1', 'inv-1', 'user-1');
        expect(res.status).toBe('SENT');
        expect(mockRepo.updateStatus).toHaveBeenCalledWith('tenant-1', 'inv-1', 'SENT');
    });
});
//# sourceMappingURL=invoice.service.spec.js.map