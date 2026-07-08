"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const customer_service_1 = require("../services/customer.service");
const customer_repository_1 = require("../repositories/customer.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('CustomerService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        const mockRepo = {
            findCustomers: jest.fn(),
            findById: jest.fn(),
            createCustomer: jest.fn(),
            updateCustomer: jest.fn(),
            deleteCustomer: jest.fn(),
        };
        const mockPrisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                customer_service_1.CustomerService,
                { provide: customer_repository_1.CustomerRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(customer_service_1.CustomerService);
        repo = module.get(customer_repository_1.CustomerRepository);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createCustomer', () => {
        it('should create a customer and audit log', async () => {
            const dto = { name: 'Acme Corp' };
            const createdCustomer = { id: 'cust-1', tenantId: 'tenant-1', ...dto };
            repo.createCustomer.mockResolvedValue(createdCustomer);
            const result = await service.createCustomer('tenant-1', 'user-1', dto);
            expect(repo.createCustomer).toHaveBeenCalledWith('tenant-1', dto);
            expect(prisma.auditLog.create).toHaveBeenCalled();
            expect(result).toEqual(createdCustomer);
        });
    });
});
//# sourceMappingURL=customer.service.spec.js.map