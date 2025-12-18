/**
 * Internal route constants for the admin application.
 * Centralizing these makes navigation changes easier.
 */
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  LOGIN: '/admin/login',
  TEMPLATES: '/admin/templates',
  TEMPLATE_EDIT: (id: string) => `/admin/templates/${id}`,
  BLOG: '/admin/blog',
  BLOG_EDIT: (id: string) => `/admin/blog/${id}`,
  LANDING: '/admin/landing',
  USERS: '/admin/users',
  ORDERS: '/admin/orders',
  PAYMENTS: '/admin/payments',
  CONTACTS: '/admin/contacts',
  MONITORING: '/admin/monitoring',
  DEPLOY: '/admin/deploy',
  LOGS: '/admin/logs',
  PROFILE: '/admin/profile',
} as const;
