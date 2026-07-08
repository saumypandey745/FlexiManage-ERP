import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePaymentDto } from '../dto/finance.dto';
import { BaseException } from '../../../common/exceptions/base.exception';
import { InvoiceStatus } from '@prisma/client';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPayments(tenantId: string) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: { invoice: true },
    });
  }

  async processPayment(tenantId: string, dto: CreatePaymentDto) {
    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({
        where: { id: dto.invoiceId },
      });

      if (!invoice || invoice.tenantId !== tenantId) {
        throw new BaseException('Invoice not found', 'FIN-PAY-404', 404);
      }

      if (Number(invoice.amountPaid) + dto.amount > Number(invoice.totalAmount)) {
        throw new BaseException('Payment exceeds invoice amount', 'FIN-PAY-400', 400);
      }

      const payment = await tx.payment.create({
        data: {
          tenantId,
          invoiceId: dto.invoiceId,
          amount: dto.amount,
          method: dto.method,
          paymentDate: new Date(dto.paymentDate),
          reference: dto.reference,
        },
      });

      const newPaid = Number(invoice.amountPaid) + dto.amount;
      const status = newPaid >= Number(invoice.totalAmount) ? InvoiceStatus.PAID : InvoiceStatus.PARTIAL;

      await tx.invoice.update({
        where: { id: invoice.id },
        data: { amountPaid: newPaid, status },
      });

      return payment;
    });
  }
}
