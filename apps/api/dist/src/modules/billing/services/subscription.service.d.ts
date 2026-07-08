import { BillingRepository } from '../repositories/billing.repository';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto/billing.dto';
export declare class SubscriptionService {
    private readonly repo;
    constructor(repo: BillingRepository);
    createSubscription(tenantId: string, userId: string, dto: CreateSubscriptionDto): Promise<{
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
    getSubscription(tenantId: string): Promise<{
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
    }>;
    updateSubscription(tenantId: string, subscriptionId: string, userId: string, dto: UpdateSubscriptionDto): Promise<{
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
    cancelSubscription(tenantId: string, subscriptionId: string, userId: string): Promise<{
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
}
