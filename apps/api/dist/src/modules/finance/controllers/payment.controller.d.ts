import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/finance.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(req: any, createDto: CreatePaymentDto): Promise<{
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
    }>;
    findAll(req: any): Promise<({
        invoice: {
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
        } | null;
    } & {
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
    })[]>;
}
