/* eslint-disable */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateContactSchema, CreateContactDto } from '../schemas/contact.schema';
import { useCreateContact, useUpdateContact } from '../api/contact.hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ContactFormProps {
  initialData?: any;
  contactId?: string;
  customerId?: string;
  onSuccess?: () => void;
}

export function ContactForm({ initialData, contactId, customerId, onSuccess }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateContactDto>({
    resolver: zodResolver(CreateContactSchema as any),
    defaultValues: initialData || { isPrimary: false, customerId },
  });

  const { mutateAsync: createContact } = useCreateContact();
  const { mutateAsync: updateContact } = useUpdateContact(contactId || '');

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: CreateContactDto) => {
    try {
      if (contactId) {
        await updateContact(data);
        toast.success('Contact updated successfully');
      } else {
        await createContact(data);
        toast.success('Contact created successfully');
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
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName?.message && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName?.message && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input id="jobTitle" {...register('jobTitle')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register('phone')} />
      </div>

      {!customerId && (
        <div className="space-y-2">
          <Label htmlFor="customerId">Customer ID *</Label>
          <Input id="customerId" {...register('customerId')} placeholder="UUID of associated Customer" />
          {errors.customerId?.message && <p className="text-xs text-red-500">{errors.customerId.message}</p>}
        </div>
      )}

      <div className="flex items-center space-x-2 pt-2">
        <input type="checkbox" id="isPrimary" {...register('isPrimary')} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
        <Label htmlFor="isPrimary">Mark as Primary Contact</Label>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Contact'}
        </Button>
      </div>
    </form>
  );
}
