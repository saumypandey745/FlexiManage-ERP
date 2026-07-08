/* eslint-disable */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOpportunitySchema, CreateOpportunityDto, OpportunityStageEnum } from '../schemas/opportunity.schema';
import { useCreateOpportunity, useUpdateOpportunity } from '../api/opportunity.hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useGetCustomers } from '../../customer-management/api/customer.hooks';

interface OpportunityFormProps {
  initialData?: any;
  opportunityId?: string;
  onSuccess?: () => void;
}

export function OpportunityForm({ initialData, opportunityId, onSuccess }: OpportunityFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateOpportunityDto>({
    resolver: zodResolver(CreateOpportunitySchema) as any,
    defaultValues: initialData || { stage: 'PROSPECTING', probability: 0 },
  });

  const { data: customers } = useGetCustomers();
  const { mutateAsync: createOpportunity } = useCreateOpportunity();
  const { mutateAsync: updateOpportunity } = useUpdateOpportunity(opportunityId || '');

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: CreateOpportunityDto) => {
    try {
      if (opportunityId) {
        await updateOpportunity(data);
        toast.success('Opportunity updated successfully');
      } else {
        await createOpportunity(data);
        toast.success('Opportunity created successfully');
      }
      onSuccess?.();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Opportunity Name *</Label>
        <Input id="name" {...register('name')} />
        {errors.name?.message && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerId">Customer *</Label>
        <select 
          id="customerId"
          {...register('customerId')}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a Customer...</option>
          {customers?.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.customerId?.message && <p className="text-xs text-red-500">{errors.customerId.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($) *</Label>
          <Input id="amount" type="number" step="0.01" {...register('amount')} />
          {errors.amount?.message && <p className="text-xs text-red-500">{errors.amount.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="probability">Probability (%)</Label>
          <Input id="probability" type="number" min="0" max="100" {...register('probability')} />
          {errors.probability?.message && <p className="text-xs text-red-500">{errors.probability.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stage">Stage</Label>
          <select 
            id="stage"
            {...register('stage')}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {OpportunityStageEnum.options.map(stage => (
              <option key={stage} value={stage}>{stage.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedClose">Expected Close Date</Label>
          <Input id="expectedClose" type="date" {...register('expectedClose')} />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Opportunity'}
        </Button>
      </div>
    </form>
  );
}
