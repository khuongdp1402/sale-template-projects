import { useQuery } from '@tanstack/react-query';
import { 
  adminTemplatesApi, adminBlogApi, adminOrdersApi, 
  adminPaymentsApi, adminContactsApi, adminMonitoringApi, 
  adminLogsApi 
} from '../services/admin';
import { ListParams } from '../types/api';

/**
 * Templates Hooks
 */
export const useTemplatesQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: () => adminTemplatesApi.list(params),
  });
};

/**
 * Blog Hooks
 */
export const useBlogPostsQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: () => adminBlogApi.list(params),
  });
};

/**
 * Orders Hooks
 */
export const useOrdersQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => adminOrdersApi.list(params),
  });
};

/**
 * Payments Hooks
 */
export const usePaymentsQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => adminPaymentsApi.list(params),
  });
};

/**
 * Contacts Hooks
 */
export const useContactsQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => adminContactsApi.list(params),
  });
};

/**
 * Monitoring Hooks
 */
export const useHealthQuery = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => adminMonitoringApi.health(),
    refetchInterval: 30000, // Refresh every 30s
  });
};

/**
 * Logs Hooks
 */
export const useLogsQuery = (params?: ListParams) => {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: () => adminLogsApi.list(params),
  });
};
