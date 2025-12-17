import { Role } from '@/types/api';

export const ROLES = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  Editor: 'Editor',
  Support: 'Support',
  Finance: 'Finance',
  Ops: 'Ops',
} as const;

export const PERMISSIONS = {
  // Templates
  TEMPLATES_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  TEMPLATES_CREATE: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  TEMPLATES_EDIT: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  TEMPLATES_DELETE: [ROLES.SuperAdmin, ROLES.Admin],

  // Blog
  BLOG_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  BLOG_CREATE: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  BLOG_EDIT: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor],
  BLOG_DELETE: [ROLES.SuperAdmin, ROLES.Admin],

  // Users
  USERS_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Support],
  USERS_EDIT: [ROLES.SuperAdmin, ROLES.Admin],
  USERS_DELETE: [ROLES.SuperAdmin],

  // Orders
  ORDERS_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Support, ROLES.Finance],
  ORDERS_EDIT: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Support],

  // Payments
  PAYMENTS_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Finance],
  PAYMENTS_EDIT: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Finance],

  // Contacts
  CONTACTS_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Support],
  CONTACTS_EDIT: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Support],

  // Monitoring
  MONITORING_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Ops],

  // Deploy
  DEPLOY_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Ops],
  DEPLOY_TRIGGER: [ROLES.SuperAdmin, ROLES.Ops],
  DEPLOY_ROLLBACK: [ROLES.SuperAdmin],

  // Logs
  LOGS_VIEW: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Ops],
} as const;

export function hasPermission(userRoles: Role[], requiredRoles: Role[]): boolean {
  return userRoles.some((role) => requiredRoles.includes(role));
}

export function requirePermission(userRoles: Role[], requiredRoles: Role[]): void {
  if (!hasPermission(userRoles, requiredRoles)) {
    throw new Error('Access denied');
  }
}

