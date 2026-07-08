import { OpportunityService } from '../services/opportunity.service';
import { CreateOpportunityDto, UpdateOpportunityDto } from '../dto/crm.dto';
export declare class OpportunityController {
    private readonly opportunityService;
    constructor(opportunityService: OpportunityService);
    getOpportunities(user: any): Promise<({
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
    getOpportunity(user: any, id: string): Promise<({
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
    createOpportunity(user: any, dto: CreateOpportunityDto): Promise<{
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
    updateOpportunity(user: any, id: string, dto: UpdateOpportunityDto): Promise<{
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
    winOpportunity(user: any, id: string): Promise<{
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
    loseOpportunity(user: any, id: string): Promise<{
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
