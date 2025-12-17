// API DTOs and types

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  roles: Role[];
  status: 'active' | 'disabled';
  createdAt: string;
}

export type Role = 'SuperAdmin' | 'Admin' | 'Editor' | 'Support' | 'Finance' | 'Ops';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  templateType: 'Service' | 'Ecommerce' | 'Landing';
  audience: 'B2B' | 'B2C' | 'Both';
  price: number;
  originalPrice?: number;
  currency: string;
  isHot: boolean;
  isNew: boolean;
  isPopular: boolean;
  popularityScore: number;
  status: 'Draft' | 'Published' | 'Archived';
  featuresCsv?: string;
  categories: TemplateCategory[];
  tags: TemplateTag[];
  media: TemplateMedia[];
  customerUseCases: CustomerUseCase[];
  similarTemplates: Template[];
  createdAt: string;
  updatedAt?: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
}

export interface TemplateTag {
  id: string;
  name: string;
  color: string;
}

export interface TemplateMedia {
  id: string;
  templateId: string;
  mediaType: 'Image' | 'Video';
  src: string;
  thumb?: string;
  title?: string;
  sortOrder: number;
}

export interface CustomerUseCase {
  id: string;
  templateId: string;
  name: string;
  industry: string;
  logo?: string;
  quote?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandingSection {
  id: string;
  sectionType: string;
  title: string;
  contentJson: Record<string, any>;
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  templateId: string;
  templateName: string;
  price: number;
  quantity: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  provider: string;
  providerReference?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  emailOrPhone: string;
  message: string;
  source?: string;
  pageUrl?: string;
  status: 'New' | 'InProgress' | 'Done';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Log {
  id: string;
  type: 'payment' | 'deploy' | 'infra' | 'provision' | 'webhook';
  severity: 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Deployment {
  id: string;
  environment: 'dev' | 'staging' | 'prod';
  status: 'queued' | 'running' | 'success' | 'failed';
  commitHash?: string;
  startedAt?: string;
  finishedAt?: string;
  logs?: string;
}

export interface HealthCheck {
  service: string;
  status: 'healthy' | 'unhealthy';
  message?: string;
  timestamp: string;
}

export interface MonitoringStatus {
  health: HealthCheck[];
  webhooks: {
    total: number;
    active: number;
    failed: number;
  };
  jobs: {
    total: number;
    running: number;
    failed: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Backend uses PagedResponse format
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages?: number;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

