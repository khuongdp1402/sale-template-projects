/**
 * UI-specific types and view models.
 * API DTOs should be imported from src/services/contracts.ts
 */

import type { 
  UserDto, 
  Role, 
  Status,
  TemplateListItemDto,
  BlogPostDto,
  OrderDto,
  PaymentDto,
  ContactDto,
  SystemLogDto,
  HealthDto,
  PagedResult
} from '../services/contracts';

export type Severity = 'info' | 'warn' | 'error';
export type BlogStatus = 'Draft' | 'Published';
export type DeployStatus = 'queued' | 'running' | 'success' | 'failed';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface LandingSection {
  id: string;
  sectionType: string; // Backend uses sectionType
  title: string;
  contentJson: any; // Backend uses contentJson
  position: number;
  isActive: boolean; // Backend uses isActive
  createdAt: string;
  updatedAt: string;
}

export interface Deployment {
  id: string;
  environment: string;
  status: DeployStatus;
  startedAt: string;
  completedAt?: string;
  deployedBy: string;
}

export interface MonitoringStatus {
  webhooks: {
    total: number;
    active: number;
    failed: number;
    items: Array<{
      name: string;
      status: string;
      lastCheck: string;
    }>;
  };
  jobs: {
    total: number;
    running: number;
    failed: number;
    items: Array<{
      name: string;
      status: string;
      lastRun: string;
    }>;
  };
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Re-export for backward compatibility
export type User = UserDto;
export type Template = TemplateListItemDto;
export type BlogPost = BlogPostDto;
export type Order = OrderDto;
export type Payment = PaymentDto;
export type Contact = ContactDto;
export type Log = SystemLogDto;
export type HealthCheck = HealthDto;
export type PagedResponse<T> = PagedResult<T>;

// Re-export enums/types
export type { Role, Status, UserDto };
