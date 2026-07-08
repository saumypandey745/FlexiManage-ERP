import { z } from 'zod';

export const CreateContactSchema = z.object({
  customerId: z.string().uuid('Customer ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  jobTitle: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

export const UpdateContactSchema = CreateContactSchema.partial();

export type CreateContactDto = z.infer<typeof CreateContactSchema>;
export type UpdateContactDto = z.infer<typeof UpdateContactSchema>;

export interface Contact {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
