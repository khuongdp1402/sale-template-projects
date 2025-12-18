import { 
  UserDto, TemplateListItemDto, BlogPostDto, OrderDto, PaymentDto, ContactDto, 
  SystemLogDto, HealthDto, PagedResult, Role
} from '../contracts';
import { BlogStatus, OrderStatus, PaymentStatus, Severity } from '../../types/api';

/**
 * In-memory Mock Database
 */
const db = {
  users: [] as UserDto[],
  templates: [] as TemplateListItemDto[],
  blogPosts: [] as BlogPostDto[],
  orders: [] as OrderDto[],
  payments: [] as PaymentDto[],
  contacts: [] as ContactDto[],
  logs: [] as SystemLogDto[],
  health: [] as HealthDto[],
};

// Seed Data Helpers
const seed = () => {
  // Users
  for (let i = 1; i <= 20; i++) {
    db.users.push({
      id: `u-${i}`,
      username: `user${i}`,
      email: `user${i}@example.com`,
      roles: (i === 1 ? ['SuperAdmin'] : ['Admin']) as Role[],
      isActive: i % 5 !== 0,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    });
  }

  // Templates
  for (let i = 1; i <= 12; i++) {
    db.templates.push({
      id: `t-${i}`,
      slug: `template-${i}`,
      name: `Template ${i}`,
      templateType: (i % 3 === 0 ? 'Ecommerce' : i % 2 === 0 ? 'Landing' : 'Service'),
      price: 1000000 + i * 100000,
      currency: 'VND',
      status: i % 10 === 0 ? 'Draft' : 'Published',
      media: [{ src: `https://picsum.photos/seed/${i}/800/600` }],
      createdAt: new Date().toISOString(),
    });
  }

  // Blog Posts
  for (let i = 1; i <= 12; i++) {
    db.blogPosts.push({
      id: `p-${i}`,
      title: `The Future of ${i % 2 === 0 ? 'Development' : 'Design'} ${i}`,
      slug: `blog-post-${i}`,
      coverImage: `https://picsum.photos/seed/blog-${i}/800/400`,
      category: i % 3 === 0 ? 'Engineering' : 'Business',
      status: (i % 4 === 0 ? 'draft' : 'published') as 'draft' | 'published',
      views: i * 150,
      createdAt: new Date().toISOString(),
    });
  }

  // Orders
  for (let i = 1; i <= 30; i++) {
    db.orders.push({
      id: `ord-${i}`,
      userEmail: `user${(i % 20) + 1}@example.com`,
      total: 1000000,
      currency: 'VND',
      status: (i % 5 === 0 ? 'cancelled' : i % 3 === 0 ? 'processing' : 'completed') as OrderDto['status'],
      paymentStatus: (i % 5 === 0 ? 'pending' : 'paid') as OrderDto['paymentStatus'],
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    });
  }

  // Payments
  for (let i = 1; i <= 30; i++) {
    db.payments.push({
      id: `pay-${i}`,
      orderId: `ord-${i}`,
      amount: 1000000,
      currency: 'VND',
      status: (i % 10 === 0 ? 'failed' : 'success') as 'success' | 'failed' | 'pending',
      provider: 'Stripe',
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    });
  }

  // Contacts
  for (let i = 1; i <= 20; i++) {
    db.contacts.push({
      id: `con-${i}`,
      name: `Contact Name ${i}`,
      emailOrPhone: `contact${i}@gmail.com`,
      message: `I would like to inquire about service #${i}.`,
      status: (i % 3 === 0 ? 'Done' : i % 2 === 0 ? 'InProgress' : 'New'),
      createdAt: new Date().toISOString(),
    });
  }

  // Logs
  for (let i = 1; i <= 50; i++) {
    db.logs.push({
      id: `log-${i}`,
      type: (i % 4 === 0 ? 'payment' : i % 3 === 0 ? 'deploy' : 'infra'),
      severity: (i % 10 === 0 ? 'error' : i % 5 === 0 ? 'warn' : 'info') as Severity,
      message: `System message ${i}: everything is functioning normally.`,
      createdAt: new Date(Date.now() - i * 1800000).toISOString(),
    });
  }

  // Health
  db.health = [
    { service: 'API Gateway', status: 'healthy', timestamp: new Date().toISOString() },
    { service: 'Auth Service', status: 'healthy', timestamp: new Date().toISOString() },
    { service: 'Payment Worker', status: 'healthy', timestamp: new Date().toISOString() },
    { service: 'Database', status: 'healthy', timestamp: new Date().toISOString() },
  ];
};

seed();

/**
 * Mock Server Implementation
 */
export const mockServer = {
  // Auth
  login: async (credentials: any) => {
    return { token: 'mock-jwt-token', user: db.users[0] };
  },

  // Users
  getUsers: async (params: any): Promise<PagedResult<UserDto>> => {
    return paginate(db.users, params);
  },
  updateUser: async (id: string, data: Partial<UserDto>) => {
    const idx = db.users.findIndex(u => u.id === id);
    if (idx > -1) db.users[idx] = { ...db.users[idx], ...data };
    return db.users[idx];
  },

  // Templates
  getTemplates: async (params: any): Promise<PagedResult<TemplateListItemDto>> => {
    return paginate(db.templates, params);
  },
  getTemplate: async (id: string) => db.templates.find(t => t.id === id || t.slug === id),

  // Blog
  getBlogPosts: async (params: any): Promise<PagedResult<BlogPostDto>> => {
    return paginate(db.blogPosts, params);
  },
  getBlogPost: async (id: string) => db.blogPosts.find(p => p.id === id || p.slug === id),

  // Orders
  getOrders: async (params: any): Promise<PagedResult<OrderDto>> => {
    return paginate(db.orders, params);
  },

  // Payments
  getPayments: async (params: any): Promise<PagedResult<PaymentDto>> => {
    return paginate(db.payments, params);
  },

  // Contacts
  getContacts: async (params: any): Promise<PagedResult<ContactDto>> => {
    return paginate(db.contacts, params);
  },

  // Monitoring
  getHealth: async () => db.health,
  getLogs: async (params: any): Promise<PagedResult<SystemLogDto>> => {
    return paginate(db.logs, params);
  },
};

// Generic Pagination Helper
function paginate<T>(items: T[], params: any): PagedResult<T> {
  const page = parseInt(params.page || '1', 10);
  const pageSize = parseInt(params.pageSize || '10', 10);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const filtered = items; // Add filtering logic here if needed
  
  return {
    items: filtered.slice(start, end),
    page,
    pageSize,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}
