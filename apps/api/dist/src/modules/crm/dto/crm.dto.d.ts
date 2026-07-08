import { LeadStatus, OpportunityStage } from '@prisma/client';
export declare class CreateLeadDto {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    phone?: string;
    status?: LeadStatus;
    source?: string;
    assignedToId?: string;
}
declare const UpdateLeadDto_base: import("@nestjs/common").Type<Partial<CreateLeadDto>>;
export declare class UpdateLeadDto extends UpdateLeadDto_base {
}
export declare class CreateCustomerDto {
    name: string;
    industry?: string;
    email?: string;
    phone?: string;
    website?: string;
    billingAddress?: string;
    shippingAddress?: string;
    assignedToId?: string;
}
declare const UpdateCustomerDto_base: import("@nestjs/common").Type<Partial<CreateCustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
export declare class CreateContactDto {
    customerId: string;
    firstName: string;
    lastName: string;
    jobTitle?: string;
    email: string;
    phone?: string;
    isPrimary?: boolean;
}
declare const UpdateContactDto_base: import("@nestjs/common").Type<Partial<CreateContactDto>>;
export declare class UpdateContactDto extends UpdateContactDto_base {
}
export declare class CreateOpportunityDto {
    customerId: string;
    name: string;
    amount: number;
    probability?: number;
    stage?: OpportunityStage;
    expectedClose?: string;
    assignedToId?: string;
}
declare const UpdateOpportunityDto_base: import("@nestjs/common").Type<Partial<CreateOpportunityDto>>;
export declare class UpdateOpportunityDto extends UpdateOpportunityDto_base {
}
export {};
