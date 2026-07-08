import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repository';
import { CreatePaymentDto } from '../dto/finance.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(tenantId: string) {
    return this.repository.findPayments(tenantId);
  }

  async create(tenantId: string, actionUserId: string, dto: CreatePaymentDto) {
    const payment = await this.repository.processPayment(tenantId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId: actionUserId,
        action: 'CREATE',
        entityName: 'Payment',
        entityId: payment.id,
        newValues: { amount: dto.amount, invoiceId: dto.invoiceId },
      },
    });

    return payment;
  }
}
