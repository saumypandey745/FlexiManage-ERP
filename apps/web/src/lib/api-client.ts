import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { useTenantStore } from '../store/tenant.store';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    const activeTenantId = useTenantStore.getState().activeTenantId;
    
    // Add Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Tenant Isolation
    if (activeTenantId) {
      config.headers['x-tenant-id'] = activeTenantId;
    }

    // Add Request ID for distributed tracing
    config.headers['x-request-id'] = crypto.randomUUID();

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // In a real app, call a refresh token endpoint here.
      // For now, if 401 occurs and no refresh token mechanism resolves it:
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    // Parse RFC7807 Error format or standard NestJS errors
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Return structured error
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      details: error.response?.data,
    });
  }
);
