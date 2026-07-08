import { Test, TestingModule } from '@nestjs/testing';
import { PayrollService } from '../services/payroll.service';
import { PayrollRepository } from '../repositories/payroll.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('PayrollService', () => {
  let service: PayrollService;
  
  const mockRepo = {
    findPayrolls: jest.fn().mockResolvedValue([]),
    generatePayroll: jest.fn().mockResolvedValue({ id: 'payroll-1' }),
  };
  
  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollService,
        { provide: PayrollRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PayrollService>(PayrollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should find all', async () => {
    const res = await service.findAll('tenant-1');
    expect(res).toEqual([]);
    expect(mockRepo.findPayrolls).toHaveBeenCalledWith('tenant-1');
  });

  it('should generate payroll', async () => {
    const dto = { month: 7, year: 2026 };
    const res = await service.generate('tenant-1', 'user-1', 'emp-1', dto);
    expect(res.id).toBe('payroll-1');
    expect(mockRepo.generatePayroll).toHaveBeenCalledWith('tenant-1', 'emp-1', dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
