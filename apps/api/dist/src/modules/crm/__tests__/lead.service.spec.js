"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lead_service_1 = require("../services/lead.service");
const lead_repository_1 = require("../repositories/lead.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
describe('LeadService', () => {
    let service;
    let repo;
    let prisma;
    beforeEach(async () => {
        const mockRepo = {
            findLeads: jest.fn(),
            findById: jest.fn(),
            createLead: jest.fn(),
            updateLead: jest.fn(),
            deleteLead: jest.fn(),
        };
        const mockPrisma = {
            auditLog: {
                create: jest.fn(),
            },
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                lead_service_1.LeadService,
                { provide: lead_repository_1.LeadRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(lead_service_1.LeadService);
        repo = module.get(lead_repository_1.LeadRepository);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createLead', () => {
        it('should create a lead and audit log', async () => {
            const dto = { firstName: 'John', lastName: 'Doe', email: 'john@acme.com' };
            const createdLead = { id: 'lead-1', tenantId: 'tenant-1', ...dto, status: client_1.LeadStatus.NEW };
            repo.createLead.mockResolvedValue(createdLead);
            const result = await service.createLead('tenant-1', 'user-1', dto);
            expect(repo.createLead).toHaveBeenCalledWith('tenant-1', dto);
            expect(prisma.auditLog.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    tenantId: 'tenant-1',
                    action: 'CREATE',
                    entityName: 'Lead',
                    entityId: 'lead-1'
                })
            });
            expect(result).toEqual(createdLead);
        });
    });
});
//# sourceMappingURL=lead.service.spec.js.map