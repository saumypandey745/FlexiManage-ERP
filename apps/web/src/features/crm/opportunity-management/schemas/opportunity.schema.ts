import { z } from 'zod';

export const OpportunityStageEnum = z.enum([
  'PROSPECTING',
  'QUALIFICATION',
  'NEEDS_ANALYSIS',
  'VALUE_PROPOSITION',
  'DECISION_MAKERS',
  'PERCEPTION_ANALYSIS',
  'PROPOSAL',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST'
]);

export const CreateOpportunitySchema = z.object({
  customerId: z.string().uuid('Customer ID is required'),
  name: z.string().min(1, 'Name is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  probability: z.coerce.number().min(0).max(100).optional().default(0),
  stage: OpportunityStageEnum.optional().default('PROSPECTING'),
  expectedClose: z.string().optional(), // ISODate string
  assignedToId: z.string().uuid('Invalid UUID').optional(),
});

export const UpdateOpportunitySchema = CreateOpportunitySchema.partial();

export type OpportunityStage = z.infer<typeof OpportunityStageEnum>;
export type CreateOpportunityDto = z.infer<typeof CreateOpportunitySchema>;
export type UpdateOpportunityDto = z.infer<typeof UpdateOpportunitySchema>;

export interface Opportunity {
  id: string;
  customerId: string;
  name: string;
  amount: number;
  probability: number;
  stage: OpportunityStage;
  expectedClose?: string;
  assignedToId?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  customer?: { id: string; name: string };
}
