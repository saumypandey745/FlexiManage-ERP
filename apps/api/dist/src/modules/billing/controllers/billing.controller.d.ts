import { BillingService } from '../services/billing.service';
import { SubscriptionService } from '../services/subscription.service';
import { CreatePaymentDto, CreateCouponDto } from '../dto/billing.dto';
export declare class BillingController {
    private readonly billingService;
    private readonly subscriptionService;
    constructor(billingService: BillingService, subscriptionService: SubscriptionService);
    getPlans(): Promise<({
        features: {
            value: string;
            id: string;
            createdAt: Date;
            limit: number | null;
            key: string;
            planId: string;
        }[];
        meteredFeatures: {
            id: string;
            createdAt: Date;
            key: string;
            planId: string;
            pricePerUnit: import("@prisma/client/runtime/library").Decimal;
            freeUnits: number;
        }[];
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        currency: string;
        version: number;
        price: import("@prisma/client/runtime/library").Decimal;
        isActive: boolean;
        interval: string;
    })[]>;
    getInvoices(req: any): Promise<({
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
    getInvoice(req: any, id: string): Promise<{
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
    processPayment(req: any, dto: CreatePaymentDto): Promise<{
        success: boolean;
        transactionId: string;
    }>;
    getUsage(req: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        currentUsage: number;
        lastResetAt: Date;
    }[]>;
    createCoupon(req: any, dto: CreateCouponDto): Promise<{
        code: string;
        discountType: string;
        discountValue: number;
        maxUses?: number;
        id: string;
    }>;
}
