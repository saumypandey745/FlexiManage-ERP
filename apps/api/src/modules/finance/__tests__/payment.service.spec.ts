import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../services/payment.service';
import { PaymentRepository } from '../repositories/payment.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;
  
  const mockRepo = {
    findPayments: jest.fn().mockResolvedValue([]),
    processPayment: jest.fn().mockResolvedValue({ id: 'pay-1' }),
  };
  
  const mockPrisma = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PaymentRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should find all', async () => {
    const res = await service.findAll('tenant-1');
    expect(res).toEqual([]);
    expect(mockRepo.findPayments).toHaveBeenCalledWith('tenant-1');
  });

  it('should process payment', async () => {
    const dto = { invoiceId: 'inv-1', amount: 100, method: 'CASH', paymentDate: '2026-07-08' };
    const res = await service.create('tenant-1', 'user-1', dto);
    expect(res.id).toBe('pay-1');
    expect(mockRepo.processPayment).toHaveBeenCalledWith('tenant-1', dto);
    expect(mockPrisma.auditLog.create).toHaveBeenCalled();
  });
});
