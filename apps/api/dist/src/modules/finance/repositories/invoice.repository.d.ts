import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateInvoiceDto } from '../dto/finance.dto';
export declare class InvoiceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findInvoices(tenantId: string): Promise<({
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
    } & {
        status: import(".prisma/client").$Enums.InvoiceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        customerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        invoiceNumber: string;
        issueDate: Date;
        dueDate: Date;
        subTotal: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
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
        payments: {
            status: import(".prisma/client").$Enums.PaymentStatus;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            reference: string | null;
            invoiceId: string | null;
            method: string;
            paymentDate: Date;
        }[];
        lines: {
            description: string;
            id: string;
            quantity: number;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            taxRateId: string | null;
            invoiceId: string;
        }[];
    } & {
        status: import(".prisma/client").$Enums.InvoiceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        customerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        invoiceNumber: string;
        issueDate: Date;
        dueDate: Date;
        subTotal: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    createInvoice(tenantId: string, dto: CreateInvoiceDto): Promise<{
        lines: {
            description: string;
            id: string;
            quantity: number;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            taxRateId: string | null;
            invoiceId: string;
        }[];
    } & {
        status: import(".prisma/client").$Enums.InvoiceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        customerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        invoiceNumber: string;
        issueDate: Date;
        dueDate: Date;
        subTotal: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateStatus(tenantId: string, id: string, status: any): Promise<{
        status: import(".prisma/client").$Enums.InvoiceStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        customerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        invoiceNumber: string;
        issueDate: Date;
        dueDate: Date;
        subTotal: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
    }>;
}
