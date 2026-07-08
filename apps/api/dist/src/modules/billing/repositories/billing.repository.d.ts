import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class BillingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    createSubscription(tenantId: string, planId: string, currentPeriodStart: Date, currentPeriodEnd: Date): Promise<{
        plan: {
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
        };
    } & {
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        version: number;
        provider: string | null;
        planId: string;
        trialStartsAt: Date | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        providerSubId: string | null;
    }>;
    getSubscription(tenantId: string): Promise<({
        plan: {
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
        };
    } & {
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        version: number;
        provider: string | null;
        planId: string;
        trialStartsAt: Date | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        providerSubId: string | null;
    }) | null>;
    updateSubscription(tenantId: string, subscriptionId: string, planId: string): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        version: number;
        provider: string | null;
        planId: string;
        trialStartsAt: Date | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        providerSubId: string | null;
    }>;
    cancelSubscription(tenantId: string, subscriptionId: string): Promise<{
        status: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        version: number;
        provider: string | null;
        planId: string;
        trialStartsAt: Date | null;
        trialEndsAt: Date | null;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
        canceledAt: Date | null;
        providerSubId: string | null;
    }>;
    logAudit(tenantId: string, userId: string, action: string, details?: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    createInvoice(tenantId: string, subscriptionId: string, amount: number): Promise<{
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
    getInvoice(tenantId: string, id: string): Promise<({
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
    }) | null>;
    getUsage(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        currentUsage: number;
        lastResetAt: Date;
    }[]>;
}
