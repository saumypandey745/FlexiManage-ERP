import { SubscriptionService } from '../services/subscription.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto/billing.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(req: any, dto: CreateSubscriptionDto): Promise<{
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
    get(req: any): Promise<{
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
    update(req: any, id: string, dto: UpdateSubscriptionDto): Promise<{
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
}
