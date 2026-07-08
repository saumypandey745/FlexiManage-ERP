export declare class InvoiceLineDto {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRateId?: string;
}
export declare class CreateInvoiceDto {
    customerId: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    lines: InvoiceLineDto[];
}
export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    method: string;
    paymentDate: string;
    reference?: string;
}
export declare class CreateExpenseDto {
    categoryId: string;
    amount: number;
    date: string;
    description: string;
}
export declare class JournalLineDto {
    accountId: string;
    debit?: number;
    credit?: number;
}
export declare class CreateJournalEntryDto {
    entryDate: string;
    reference: string;
    description: string;
    lines: JournalLineDto[];
}
