import { z } from 'zod';

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  customerId: z.string().min(1, 'Customer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  subTotal: z.number().min(0),
  taxTotal: z.number().min(0),
  totalAmount: z.number().min(0),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']).default('DRAFT')
});
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

export const createExpenseSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional()
});
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
