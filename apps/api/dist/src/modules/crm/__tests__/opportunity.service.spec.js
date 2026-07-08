"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const opportunity_service_1 = require("../services/opportunity.service");
const opportunity_repository_1 = require("../repositories/opportunity.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('OpportunityService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        const mockRepo = {
            findOpportunities: jest.fn(),
            findById: jest.fn(),
            createOpportunity: jest.fn(),
            updateOpportunity: jest.fn(),
            updateStage: jest.fn(),
        };
        const mockPrisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                opportunity_service_1.OpportunityService,
                { provide: opportunity_repository_1.OpportunityRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(opportunity_service_1.OpportunityService);
        repo = module.get(opportunity_repository_1.OpportunityRepository);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createOpportunity', () => {
        it('should create an opportunity and audit log', async () => {
            const dto = { name: 'License', amount: 50000, customerId: 'cust-1' };
            const createdOpp = { id: 'opp-1', tenantId: 'tenant-1', stage: client_1.OpportunityStage.PROSPECTING, ...dto };
            repo.createOpportunity.mockResolvedValue(createdOpp);
            const result = await service.createOpportunity('tenant-1', 'user-1', dto);
            expect(repo.createOpportunity).toHaveBeenCalledWith('tenant-1', dto, 'user-1');
            expect(prisma.auditLog.create).toHaveBeenCalled();
            expect(result).toEqual(createdOpp);
        });
    });
});
//# sourceMappingURL=opportunity.service.spec.js.map