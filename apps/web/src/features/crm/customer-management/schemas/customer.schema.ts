import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  industry: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  billingAddress: z.string().optional(),
  shippingAddress: z.string().optional(),
  assignedToId: z.string().uuid('Invalid UUID').optional(),
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;

export interface Customer {
  id: string;
  name: string;
  industry?: string;
  email?: string;
  phone?: string;
  website?: string;
  billingAddress?: string;
  shippingAddress?: string;
  assignedToId?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
