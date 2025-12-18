import { components, paths } from '../types/openapi';

/**
 * Single Source of Truth for API Contracts.
 * Derived directly from the generated OpenAPI types.
 */

export type AdminPaths = paths;
export type AdminSchemas = components['schemas'];

// Typed Aliases for commonly used DTOs
export type UserDto = AdminSchemas['UserDto'];
export type TemplateListItemDto = AdminSchemas['TemplateListItemDto'];
export type TemplateDetailDto = AdminSchemas['TemplateDetailDto'];
export type BlogPostDto = AdminSchemas['BlogPostDto'];
export type OrderDto = AdminSchemas['OrderDto'];
export type PaymentDto = AdminSchemas['PaymentDto'];
export type ContactDto = AdminSchemas['ContactDto'];
export type SystemLogDto = AdminSchemas['SystemLogDto'];
export type DeployTargetDto = AdminSchemas['DeployTargetDto'];
export type SiteDto = AdminSchemas['SiteDto'];
export type JobDto = AdminSchemas['JobDto'];
export type HealthDto = AdminSchemas['HealthDto'];

// Generic Paged Result mapping
export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages?: number;
};

// Re-export common enums/types that UI depends on
export type Role = UserDto['roles'][number];
export type Status = 'active' | 'disabled' | 'pending';
