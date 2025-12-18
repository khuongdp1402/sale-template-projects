import { createApiCall, api } from '../apiAdapter';
import { mockServer } from '../mock/mockServer';
import { ListParams } from '../../types/api';
import { 
  TemplateListItemDto, BlogPostDto, OrderDto, 
  PaymentDto, ContactDto, SystemLogDto, 
  HealthDto, SiteDto, PagedResult 
} from '../contracts';

/**
 * Templates API
 */
export const adminTemplatesApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<TemplateListItemDto>>('/templates', params),
    (params?: ListParams) => mockServer.getTemplates(params)
  ),
  getById: createApiCall(
    (id: string) => api.get<TemplateListItemDto>(`/templates/${id}`),
    (id: string) => mockServer.getTemplate(id) as Promise<TemplateListItemDto>
  ),
};

/**
 * Blog API
 */
export const adminBlogApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<BlogPostDto>>('/blog/posts', params),
    (params?: ListParams) => mockServer.getBlogPosts(params)
  ),
  getById: createApiCall(
    (id: string) => api.get<BlogPostDto>(`/blog/posts/${id}`),
    (id: string) => mockServer.getBlogPost(id) as Promise<BlogPostDto>
  ),
};

/**
 * Orders API
 */
export const adminOrdersApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<OrderDto>>('/orders', params),
    (params?: ListParams) => mockServer.getOrders(params)
  ),
};

/**
 * Payments API
 */
export const adminPaymentsApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<PaymentDto>>('/payments', params),
    (params?: ListParams) => mockServer.getPayments(params)
  ),
};

/**
 * Contacts API
 */
export const adminContactsApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<ContactDto>>('/contacts', params),
    (params?: ListParams) => mockServer.getContacts(params)
  ),
};

/**
 * Monitoring API
 */
export const adminMonitoringApi = {
  health: createApiCall(
    () => api.get<HealthDto[]>('/monitoring/health'),
    () => mockServer.getHealth()
  ),
};

/**
 * Logs API
 */
export const adminLogsApi = {
  list: createApiCall(
    (params?: ListParams) => api.get<PagedResult<SystemLogDto>>('/logs', params),
    (params?: ListParams) => mockServer.getLogs(params)
  ),
};

/**
 * Deploy API
 */
export const adminDeployApi = {
  listSites: createApiCall(
    () => api.get<SiteDto[]>('/deploy/sites'),
    async () => []
  ),
};

// Re-export users for convenience
export { adminUsersApi } from './users';
