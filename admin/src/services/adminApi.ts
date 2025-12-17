import { apiClient } from '@/lib/apiClient';
import type {
  Template,
  BlogPost,
  LandingSection,
  User,
  Order,
  Payment,
  Contact,
  Log,
  Deployment,
  HealthCheck,
  MonitoringStatus,
  PagedResponse,
} from '@/types/api';

// Templates
export const templatesApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    type?: string;
    audience?: string;
    status?: string;
  }): Promise<PagedResponse<Template>> => {
    const response = await apiClient.get('/api/admin/templates', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Template> => {
    const response = await apiClient.get(`/api/admin/templates/${id}`);
    return response.data;
  },

  create: async (data: Partial<Template>): Promise<Template> => {
    const response = await apiClient.post('/api/admin/templates', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Template>): Promise<Template> => {
    const response = await apiClient.put(`/api/admin/templates/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/templates/${id}`);
  },

  publish: async (id: string): Promise<void> => {
    await apiClient.post(`/api/admin/templates/${id}/publish`);
  },

  unpublish: async (id: string): Promise<void> => {
    await apiClient.post(`/api/admin/templates/${id}/unpublish`);
  },
};

// Blog
export const blogApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<PagedResponse<BlogPost>> => {
    const response = await apiClient.get('/api/admin/blog/posts', { params });
    return response.data;
  },

  getById: async (id: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/api/admin/blog/posts/${id}`);
    return response.data;
  },

  create: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await apiClient.post('/api/admin/blog/posts', data);
    return response.data;
  },

  update: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await apiClient.put(`/api/admin/blog/posts/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/blog/posts/${id}`);
  },

  publish: async (id: string): Promise<void> => {
    await apiClient.post(`/api/admin/blog/posts/${id}/publish`);
  },

  unpublish: async (id: string): Promise<void> => {
    await apiClient.post(`/api/admin/blog/posts/${id}/unpublish`);
  },
};

// Landing Sections
export const landingApi = {
  list: async (): Promise<LandingSection[]> => {
    const response = await apiClient.get('/api/admin/landing/sections');
    return response.data;
  },

  getById: async (id: string): Promise<LandingSection> => {
    const response = await apiClient.get(`/api/admin/landing/sections/${id}`);
    return response.data;
  },

  create: async (data: Partial<LandingSection>): Promise<LandingSection> => {
    const response = await apiClient.post('/api/admin/landing/sections', data);
    return response.data;
  },

  update: async (id: string, data: Partial<LandingSection>): Promise<LandingSection> => {
    const response = await apiClient.put(`/api/admin/landing/sections/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/landing/sections/${id}`);
  },

  reorder: async (items: Array<{ id: string; position: number }>): Promise<void> => {
    await apiClient.put('/api/admin/landing/sections/reorder', { items });
  },
};

// Users
export const usersApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<PagedResponse<User>> => {
    const response = await apiClient.get('/api/admin/users', { params });
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/api/admin/users/${id}`);
    return response.data;
  },

  updateRoles: async (id: string, roles: string[]): Promise<void> => {
    await apiClient.put(`/api/admin/users/${id}/roles`, { roles });
  },

  updateStatus: async (id: string, status: 'Active' | 'Disabled'): Promise<void> => {
    await apiClient.put(`/api/admin/users/${id}/status`, { status });
  },
};

// Orders
export const ordersApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }): Promise<PagedResponse<Order>> => {
    const response = await apiClient.get('/api/admin/orders', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/api/admin/orders/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    await apiClient.put(`/api/admin/orders/${id}/status`, { status });
  },
};

// Payments
export const paymentsApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    status?: string;
    provider?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<PagedResponse<Payment>> => {
    const response = await apiClient.get('/api/admin/payments', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Payment> => {
    const response = await apiClient.get(`/api/admin/payments/${id}`);
    return response.data;
  },

  getFailures: async (): Promise<Payment[]> => {
    const response = await apiClient.get('/api/admin/payments/failures');
    return response.data;
  },
};

// Contacts
export const contactsApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }): Promise<PagedResponse<Contact>> => {
    const response = await apiClient.get('/api/admin/contacts', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Contact> => {
    const response = await apiClient.get(`/api/admin/contacts/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    await apiClient.put(`/api/admin/contacts/${id}/status`, { status });
  },

  updateNotes: async (id: string, notes: string): Promise<void> => {
    await apiClient.put(`/api/admin/contacts/${id}/notes`, { notes });
  },
};

// Logs
export const logsApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    type?: string;
    severity?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }): Promise<PagedResponse<Log>> => {
    const response = await apiClient.get('/api/admin/logs', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Log> => {
    const response = await apiClient.get(`/api/admin/logs/${id}`);
    return response.data;
  },
};

// Monitoring
export const monitoringApi = {
  getHealth: async (): Promise<HealthCheck[]> => {
    const response = await apiClient.get('/api/admin/monitoring/health');
    return response.data;
  },

  getWebhooks: async (): Promise<MonitoringStatus['webhooks']> => {
    const response = await apiClient.get('/api/admin/monitoring/webhooks');
    return response.data;
  },

  getJobs: async (): Promise<MonitoringStatus['jobs']> => {
    const response = await apiClient.get('/api/admin/monitoring/jobs');
    return response.data;
  },

  getIncidents: async (): Promise<Log[]> => {
    const response = await apiClient.get('/api/admin/monitoring/incidents');
    return response.data;
  },
};

// Deployments
export const deploymentsApi = {
  list: async (): Promise<Deployment[]> => {
    const response = await apiClient.get('/api/admin/deployments');
    return response.data;
  },

  getById: async (id: string): Promise<Deployment> => {
    const response = await apiClient.get(`/api/admin/deployments/${id}`);
    return response.data;
  },

  trigger: async (environment: string): Promise<Deployment> => {
    const response = await apiClient.post('/api/admin/deployments/trigger', { environment });
    return response.data;
  },

  rollback: async (id: string): Promise<void> => {
    await apiClient.post(`/api/admin/deployments/${id}/rollback`);
  },
};

