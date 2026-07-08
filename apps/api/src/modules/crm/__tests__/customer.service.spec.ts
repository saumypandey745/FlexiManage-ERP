import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../services/customer.service';
import { CustomerRepository } from '../repositories/customer.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: jest.Mocked<CustomerRepository>;
  let prisma: jest.Mocked<PrismaService>;

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: CustomerRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repo = module.get(CustomerRepository);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer and audit log', async () => {
      const dto = { name: 'Acme Corp' };
      const createdCustomer = { id: 'cust-1', tenantId: 'tenant-1', ...dto };
      
      repo.createCustomer.mockResolvedValue(createdCustomer as any);
      
      const result = await service.createCustomer('tenant-1', 'user-1', dto);
      
      expect(repo.createCustomer).toHaveBeenCalledWith('tenant-1', dto);
      expect(prisma.auditLog.create).toHaveBeenCalled();
      expect(result).toEqual(createdCustomer);
    });
  });
});
