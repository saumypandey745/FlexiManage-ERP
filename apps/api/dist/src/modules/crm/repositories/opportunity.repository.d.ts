import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateOpportunityDto, UpdateOpportunityDto } from '../dto/crm.dto';
import { OpportunityStage } from '@prisma/client';
export declare class OpportunityRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOpportunities(tenantId: string): Promise<({
        customer: {
            email: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            phone: string | null;
            assignedToId: string | null;
            industry: string | null;
            website: string | null;
            billingAddress: string | null;
            shippingAddress: string | null;
        };
        assignedTo: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        assignedToId: string | null;
        customerId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        probability: number;
        stage: import(".prisma/client").$Enums.OpportunityStage;
        expectedClose: Date | null;
    })[]>;
    findById(tenantId: string, id: string): Promise<({
        customer: {
            email: string | null;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            phone: string | null;
            assignedToId: string | null;
            industry: string | null;
            website: string | null;
            billingAddress: string | null;
            shippingAddress: string | null;
        };
        assignedTo: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
        history: {
            id: string;
            opportunityId: string;
            oldStage: import(".prisma/client").$Enums.OpportunityStage | null;
            newStage: import(".prisma/client").$Enums.OpportunityStage;
            changedAt: Date;
            changedById: string;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        assignedToId: string | null;
        customerId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        probability: number;
        stage: import(".prisma/client").$Enums.OpportunityStage;
        expectedClose: Date | null;
    }) | null>;
    createOpportunity(tenantId: string, dto: CreateOpportunityDto, actionUserId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        assignedToId: string | null;
        customerId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        probability: number;
        stage: import(".prisma/client").$Enums.OpportunityStage;
        expectedClose: Date | null;
    }>;
    updateOpportunity(tenantId: string, id: string, dto: UpdateOpportunityDto, actionUserId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        assignedToId: string | null;
        customerId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        probability: number;
        stage: import(".prisma/client").$Enums.OpportunityStage;
        expectedClose: Date | null;
    }>;
    updateStage(tenantId: string, id: string, stage: OpportunityStage, actionUserId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        assignedToId: string | null;
        customerId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        probability: number;
        stage: import(".prisma/client").$Enums.OpportunityStage;
        expectedClose: Date | null;
    }>;
}
