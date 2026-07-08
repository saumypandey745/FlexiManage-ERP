/* eslint-disable */
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

// Generic Fetch Hook
export function useApiQuery<TData>(
  queryKey: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<TData, any, TData, string[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await apiClient.get<TData>(endpoint);
      return data;
    },
    ...options,
  });
}

// Generic Mutation Hook
export function useApiMutation<TData, TVariables = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseMutationOptions<TData, any, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient.request<TData>({
        url: endpoint,
        method,
        data: variables,
      });
      return response.data;
    },
    ...options,
  });
}
