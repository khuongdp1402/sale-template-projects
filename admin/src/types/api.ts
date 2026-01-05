/**
 * UI-specific types and view models.
 * API DTOs should be imported from src/services/contracts.ts
 */

export type { Role, Status, UserDto } from '../services/contracts';

export type Severity = 'info' | 'warn' | 'error';
export type BlogStatus = 'draft' | 'published';
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
  type: string;
  title: string;
  content: string;
  position: number;
  isVisible: boolean;
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
  webhooks: Array<{
    name: string;
    status: string;
    lastCheck: string;
  }>;
  jobs: Array<{
    name: string;
    status: string;
    lastRun: string;
  }>;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Re-exporting these for backward compatibility during transition
// In a real project, we would gradually replace these with DTOs from contracts.ts
export type { 
  UserDto as User,
  UserDto,
  TemplateListItemDto as Template,
  BlogPostDto as BlogPost,
  OrderDto as Order,
  PaymentDto as Payment,
  ContactDto as Contact,
  SystemLogDto as Log,
  HealthDto as HealthCheck,
  PagedResult as PagedResponse,
  Role
} from '../services/contracts';
