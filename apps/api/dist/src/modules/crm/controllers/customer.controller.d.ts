import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/crm.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getCustomers(user: any): Promise<({
        contacts: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            phone: string | null;
            customerId: string;
            jobTitle: string | null;
            isPrimary: boolean;
        }[];
        opportunities: {
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
        }[];
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
    })[]>;
    getCustomer(user: any, id: string): Promise<({
        contacts: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            phone: string | null;
            customerId: string;
            jobTitle: string | null;
            isPrimary: boolean;
        }[];
        opportunities: {
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
        }[];
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
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            customerId: string;
        }[];
    } & {
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
    }) | null>;
    createCustomer(user: any, dto: CreateCustomerDto): Promise<{
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
    }>;
    updateCustomer(user: any, id: string, dto: UpdateCustomerDto): Promise<{
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
    }>;
    deleteCustomer(user: any, id: string): Promise<{
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
    }>;
}
