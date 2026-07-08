import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../schemas/customer.schema';

const CUSTOMERS_KEY = ['crm', 'customers'];

export const useGetCustomers = () => {
  return useApiQuery<Customer[]>(CUSTOMERS_KEY, '/crm/customers');
};

export const useGetCustomer = (id: string) => {
  return useApiQuery<Customer>([...CUSTOMERS_KEY, id], `/crm/customers/${id}`, {
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useApiMutation<Customer, CreateCustomerDto>('/crm/customers', 'POST', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
    },
  });
};

export const useUpdateCustomer = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Customer, UpdateCustomerDto>(`/crm/customers/${id}`, 'PATCH', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CUSTOMERS_KEY, id] });
    },
  });
};

export const useDeleteCustomer = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Customer, void>(`/crm/customers/${id}`, 'DELETE', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
    },
  });
};
