"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const warehouse_service_1 = require("../services/warehouse.service");
const warehouse_repository_1 = require("../repositories/warehouse.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const base_exception_1 = require("../../../common/exceptions/base.exception");
describe('WarehouseService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        repo = {
            findWarehouses: jest.fn(),
            findById: jest.fn(),
            createWarehouse: jest.fn(),
            updateWarehouse: jest.fn(),
            deleteWarehouse: jest.fn(),
        };
        prisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                warehouse_service_1.WarehouseService,
                { provide: warehouse_repository_1.WarehouseRepository, useValue: repo },
                { provide: prisma_service_1.PrismaService, useValue: prisma },
            ],
        }).compile();
        service = module.get(warehouse_service_1.WarehouseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findAll', () => {
        it('should return warehouses', async () => {
            repo.findWarehouses.mockResolvedValue([]);
            expect(await service.findAll('t1')).toEqual([]);
        });
    });
    describe('findOne', () => {
        it('should throw if not found', async () => {
            repo.findById.mockResolvedValue(null);
            await expect(service.findOne('t1', 'w1')).rejects.toThrow(base_exception_1.BaseException);
        });
    });
});
//# sourceMappingURL=warehouse.service.spec.js.map