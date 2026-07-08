import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from '../services/lead.service';
import { LeadRepository } from '../repositories/lead.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { LeadStatus } from '@prisma/client';

describe('LeadService', () => {
  let service: LeadService;
  let repo: jest.Mocked<LeadRepository>;
  let prisma: jest.Mocked<PrismaService>;

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        { provide: LeadRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    repo = module.get(LeadRepository);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLead', () => {
    it('should create a lead and audit log', async () => {
      const dto = { firstName: 'John', lastName: 'Doe', email: 'john@acme.com' };
      const createdLead = { id: 'lead-1', tenantId: 'tenant-1', ...dto, status: LeadStatus.NEW };
      
      repo.createLead.mockResolvedValue(createdLead as any);
      
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
