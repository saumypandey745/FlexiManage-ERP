/* eslint-disable */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLeadSchema, CreateLeadDto, LeadStatusEnum } from '../schemas/lead.schema';
import { useCreateLead, useUpdateLead } from '../api/lead.hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface LeadFormProps {
  initialData?: any;
  leadId?: string;
  onSuccess?: () => void;
}

export function LeadForm({ initialData, leadId, onSuccess }: LeadFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateLeadDto>({
    resolver: zodResolver(CreateLeadSchema as any),
    defaultValues: initialData || { status: 'NEW' },
  });

  const { mutateAsync: createLead } = useCreateLead();
  const { mutateAsync: updateLead } = useUpdateLead(leadId || '');

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: CreateLeadDto) => {
    try {
      if (leadId) {
        await updateLead(data);
        toast.success('Lead updated successfully');
      } else {
        await createLead(data);
        toast.success('Lead created successfully');
      }
      onSuccess?.();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName?.message && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName?.message && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register('company')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register('phone')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select 
          id="status"
          {...register('status')}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {LeadStatusEnum.options.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Lead'}
        </Button>
      </div>
    </form>
  );
}
