"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const expense_service_1 = require("../services/expense.service");
const expense_repository_1 = require("../repositories/expense.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('ExpenseService', () => {
    let service;
    const mockRepo = {
        findExpenses: jest.fn().mockResolvedValue([]),
        createExpense: jest.fn().mockResolvedValue({ id: 'exp-1' }),
    };
    const mockPrisma = {
        auditLog: {
            create: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                expense_service_1.ExpenseService,
                { provide: expense_repository_1.ExpenseRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(expense_service_1.ExpenseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all', async () => {
        const res = await service.findAll('tenant-1');
        expect(res).toEqual([]);
        expect(mockRepo.findExpenses).toHaveBeenCalledWith('tenant-1');
    });
    it('should create expense', async () => {
        const dto = { categoryId: 'cat-1', amount: 100, description: 'Travel', date: '2026-07-08' };
        const res = await service.create('tenant-1', 'user-1', dto);
        expect(res.id).toBe('exp-1');
        expect(mockRepo.createExpense).toHaveBeenCalledWith('tenant-1', 'user-1', dto);
        expect(mockPrisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=expense.service.spec.js.map