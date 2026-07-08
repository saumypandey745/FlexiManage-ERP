import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Supplier {
  id: string;
  [key: string]: unknown;
}

export function useSuppliers(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['inventory', 'suppliers', params],
    queryFn: async () => {
      const res = await apiClient.get<Supplier[]>('/suppliers', { params });
      return res.data;
    },
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: ['inventory', 'supplier', id],
    queryFn: async () => {
      const res = await apiClient.get<Supplier>(`/suppliers/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Supplier>('/suppliers', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'suppliers'] });
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Supplier>(`/suppliers/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'supplier', variables.id] });
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/suppliers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'suppliers'] });
    },
  });
}
