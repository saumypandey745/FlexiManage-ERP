import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceDto } from '../dto/finance.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class InvoiceService {
    private readonly repository;
    private readonly prisma;
    constructor(repository: InvoiceRepository, prisma: PrismaService);
    findAll(tenantId: string): Promise<({
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
    create(tenantId: string, actionUserId: string, dto: CreateInvoiceDto): Promise<{
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
    send(tenantId: string, id: string, actionUserId: string): Promise<{
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
