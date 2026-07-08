"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stock_service_1 = require("../services/stock.service");
const stock_repository_1 = require("../repositories/stock.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('StockService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        repo = {
            getMovements: jest.fn(),
            processMovement: jest.fn(),
        };
        prisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                stock_service_1.StockService,
                { provide: stock_repository_1.StockRepository, useValue: repo },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        service = module.get(stock_service_1.StockService);
    });
    it('should get movements', async () => {
        repo.getMovements.mockResolvedValue([]);
        expect(await service.getMovements('t1')).toEqual([]);
    });
    it('should process movement and log', async () => {
        repo.processMovement.mockResolvedValue({ id: 'sm1' });
        const dto = { type: client_1.MovementType.IN, productId: 'p1', quantity: 10 };
        await service.processMovement('t1', 'u1', dto);
        expect(repo.processMovement).toHaveBeenCalled();
        expect(prisma.auditLog.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=stock.service.spec.js.map