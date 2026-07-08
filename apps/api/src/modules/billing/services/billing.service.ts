import { Injectable, NotFoundException } from '@nestjs/common';
import { BillingRepository } from '../repositories/billing.repository';
import { CreatePaymentDto, CreateCouponDto } from '../dto/billing.dto';

@Injectable()
export class BillingService {
  constructor(private readonly repo: BillingRepository) {}

  async getInvoices(tenantId: string) {
    return this.repo.getInvoices(tenantId);
  }

  async getInvoice(tenantId: string, id: string) {
    const invoice = await this.repo.getInvoice(tenantId, id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async processPayment(tenantId: string, userId: string, dto: CreatePaymentDto) {
    // In a full implementation, this will route to Stripe/Razorpay via PaymentProvider interface
    const invoice = await this.repo.getInvoice(tenantId, dto.invoiceId);
    if (!invoice) throw new NotFoundException('Invoice not found');
    
    await this.repo.logAudit(tenantId, userId, 'PAYMENT_INITIATED', { provider: dto.provider, invoiceId: dto.invoiceId });
    return { success: true, transactionId: 'txn_mock123' };
  }

  async getUsage(tenantId: string) {
    return this.repo.getUsage(tenantId);
  }

  async createCoupon(tenantId: string, dto: CreateCouponDto) {
    // Mock implementation for creating a coupon
    return { id: 'mock-coupon-1', ...dto };
  }
}
