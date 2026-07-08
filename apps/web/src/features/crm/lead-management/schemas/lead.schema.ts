import { z } from 'zod';

export const LeadStatusEnum = z.enum([
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'UNQUALIFIED',
  'CUSTOMER',
  'ARCHIVED'
]);

export const CreateLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  status: LeadStatusEnum.optional().default('NEW'),
  source: z.string().optional(),
  assignedToId: z.string().uuid('Invalid UUID').optional(),
});

export const UpdateLeadSchema = CreateLeadSchema.partial();

export type LeadStatus = z.infer<typeof LeadStatusEnum>;
export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;
export type UpdateLeadDto = z.infer<typeof UpdateLeadSchema>;

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  source?: string;
  assignedToId?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
