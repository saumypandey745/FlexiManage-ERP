import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BillingRepository } from "../repositories/billing.repository";
import { CreatePaymentDto, CreateCouponDto } from "../dto/billing.dto";
import Stripe from "stripe";

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(
    private readonly repo: BillingRepository,
    private readonly configService: ConfigService
  ) {
    const stripeKey = this.configService.get<string>("STRIPE_SECRET_KEY");
    this.stripe = new Stripe(stripeKey || "", {
      apiVersion: "2026-06-24.dahlia" as any,
    });
  }

  async getInvoices(tenantId: string) {
    return this.repo.getInvoices(tenantId);
  }

  async getInvoice(tenantId: string, id: string) {
    const invoice = await this.repo.getInvoice(tenantId, id);
    if (!invoice) throw new NotFoundException("Invoice not found");
    return invoice;
  }

  async processPayment(
    tenantId: string,
    userId: string,
    dto: CreatePaymentDto
  ) {
    const invoice = await this.repo.getInvoice(tenantId, dto.invoiceId);
    if (!invoice) throw new NotFoundException("Invoice not found");

    if (dto.provider === "stripe") {
      try {
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: Math.round(Number(invoice.amount) * 100), // convert to cents
          currency: "usd",
          metadata: {
            tenantId,
            invoiceId: dto.invoiceId,
            userId,
          },
        });

        await this.repo.logAudit(tenantId, userId, "PAYMENT_INITIATED", {
          provider: dto.provider,
          invoiceId: dto.invoiceId,
        });
        return {
          success: true,
          clientSecret: paymentIntent.client_secret,
          transactionId: paymentIntent.id,
        };
      } catch (error) {
        throw new BadRequestException(`Stripe error: ${error.message}`);
      }
    }

    throw new BadRequestException("Unsupported payment provider");
  }

  async getUsage(tenantId: string) {
    return this.repo.getUsage(tenantId);
  }

  async createCoupon(tenantId: string, dto: CreateCouponDto) {
    try {
      const couponDto: any = dto;
      const coupon = await this.stripe.coupons.create({
        percent_off: couponDto.percentOff,
        amount_off: couponDto.amountOff
          ? Math.round(couponDto.amountOff * 100)
          : undefined,
        currency: couponDto.amountOff ? "usd" : undefined,
        duration: "once", // simplify for now
        name: dto.code,
      });

      return { id: coupon.id, ...dto };
    } catch (error) {
      throw new BadRequestException(`Stripe error: ${error.message}`);
    }
  }

  async getCoupons(tenantId: string) {
    try {
      const coupons = await this.stripe.coupons.list({ limit: 10 });
      return coupons.data;
    } catch (error) {
      throw new BadRequestException(`Stripe error: ${error.message}`);
    }
  }
}
