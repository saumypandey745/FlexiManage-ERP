import { BillingRepository } from '../repositories/billing.repository';
import { CreatePaymentDto, CreateCouponDto } from '../dto/billing.dto';
export declare class BillingService {
    private readonly repo;
    constructor(repo: BillingRepository);
    getInvoices(tenantId: string): Promise<({
        items: {
            description: string;
            id: string;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            invoiceId: string;
        }[];
        transactions: {
            status: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            invoiceId: string | null;
            method: string | null;
            receiptUrl: string | null;
            provider: string;
            providerTxId: string;
        }[];
    } & {
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        pdfUrl: string | null;
        providerInvId: string | null;
        subscriptionId: string | null;
    })[]>;
    getInvoice(tenantId: string, id: string): Promise<{
        items: {
            description: string;
            id: string;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            invoiceId: string;
        }[];
        transactions: {
            status: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            invoiceId: string | null;
            method: string | null;
            receiptUrl: string | null;
            provider: string;
            providerTxId: string;
        }[];
    } & {
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        pdfUrl: string | null;
        providerInvId: string | null;
        subscriptionId: string | null;
    }>;
    processPayment(tenantId: string, userId: string, dto: CreatePaymentDto): Promise<{
        success: boolean;
        transactionId: string;
    }>;
    getUsage(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        currentUsage: number;
        lastResetAt: Date;
    }[]>;
    createCoupon(tenantId: string, dto: CreateCouponDto): Promise<{
        code: string;
        discountType: string;
        discountValue: number;
        maxUses?: number;
        id: string;
    }>;
}
