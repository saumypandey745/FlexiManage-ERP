"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const purchase_order_service_1 = require("../services/purchase-order.service");
const purchase_order_repository_1 = require("../repositories/purchase-order.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('PurchaseOrderService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        repo = {
            findPurchaseOrders: jest.fn(),
            findById: jest.fn(),
            createPO: jest.fn(),
            updateStatus: jest.fn(),
            receivePO: jest.fn(),
        };
        prisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                purchase_order_service_1.PurchaseOrderService,
                { provide: purchase_order_repository_1.PurchaseOrderRepository, useValue: repo },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        service = module.get(purchase_order_service_1.PurchaseOrderService);
    });
    it('should find all', async () => {
        repo.findPurchaseOrders.mockResolvedValue([]);
        expect(await service.findAll('t1')).toEqual([]);
    });
    it('should approve', async () => {
        repo.findById.mockResolvedValue({ id: 'po1' });
        repo.updateStatus.mockResolvedValue({ id: 'po1', status: client_1.POStatus.APPROVED });
        await service.approve('t1', 'po1', 'u1');
        expect(repo.updateStatus).toHaveBeenCalledWith('t1', 'po1', client_1.POStatus.APPROVED);
        expect(prisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=purchase-order.service.spec.js.map