import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { Contact, CreateContactDto, UpdateContactDto } from '../schemas/contact.schema';

const CONTACTS_KEY = ['crm', 'contacts'];

export const useGetContacts = (customerId?: string) => {
  return useApiQuery<Contact[]>(
    customerId ? [...CONTACTS_KEY, 'by-customer', customerId] : CONTACTS_KEY,
    customerId ? `/crm/contacts?customerId=${customerId}` : '/crm/contacts'
  );
};

export const useGetContact = (id: string) => {
  return useApiQuery<Contact>([...CONTACTS_KEY, id], `/crm/contacts/${id}`, {
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useApiMutation<Contact, CreateContactDto>('/crm/contacts', 'POST', {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CONTACTS_KEY, 'by-customer', variables.customerId] });
    },
  });
};

export const useUpdateContact = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Contact, UpdateContactDto>(`/crm/contacts/${id}`, 'PATCH', {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CONTACTS_KEY, id] });
      if (variables.customerId) {
        queryClient.invalidateQueries({ queryKey: [...CONTACTS_KEY, 'by-customer', variables.customerId] });
      }
    },
  });
};

export const useDeleteContact = (id: string, customerId?: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Contact, void>(`/crm/contacts/${id}`, 'DELETE', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_KEY });
      if (customerId) {
        queryClient.invalidateQueries({ queryKey: [...CONTACTS_KEY, 'by-customer', customerId] });
      }
    },
  });
};
