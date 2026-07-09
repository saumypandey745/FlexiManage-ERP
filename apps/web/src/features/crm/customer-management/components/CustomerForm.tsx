/* eslint-disable */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCustomerSchema, CreateCustomerDto } from '../schemas/customer.schema';
import { useCreateCustomer, useUpdateCustomer } from '../api/customer.hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface CustomerFormProps {
  initialData?: any;
  customerId?: string;
  onSuccess?: () => void;
}

export function CustomerForm({ initialData, customerId, onSuccess }: CustomerFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateCustomerDto>({
    resolver: zodResolver(CreateCustomerSchema as any),
    defaultValues: initialData || {},
  });

  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: updateCustomer } = useUpdateCustomer(customerId || '');

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: CreateCustomerDto) => {
    try {
      if (customerId) {
        await updateCustomer(data);
        toast.success('Customer updated successfully');
      } else {
        await createCustomer(data);
        toast.success('Customer created successfully');
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
        <Label htmlFor="name">Customer Name *</Label>
        <Input id="name" {...register('name')} />
        {errors.name?.message && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" {...register('industry')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register('phone')} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" placeholder="https://" {...register('website')} />
        {errors.website?.message && <p className="text-xs text-red-500">{errors.website.message}</p>}
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Customer'}
        </Button>
      </div>
    </form>
  );
}
