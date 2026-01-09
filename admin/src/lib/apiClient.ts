import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

/**
 * Base ApiClient using Axios.
 * Configured with base URL, versioning, and auth interceptors.
 */
class ApiClient {
  private client: AxiosInstance;
  private authClient: AxiosInstance;

  constructor() {
    // Admin API client (for /api/v1/admin/* endpoints)
    this.client = axios.create({
      baseURL: env.adminApiBase,
      timeout: env.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Auth API client (for /api/v1/auth/* endpoints)
    this.authClient = axios.create({
      baseURL: env.authApiBase,
      timeout: env.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Setup interceptors for both clients
    this.setupInterceptors(this.client);
    this.setupInterceptors(this.authClient);

  }

  private setupInterceptors(client: AxiosInstance): void {
    // Request interceptor: attach token from localStorage
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('admin_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: handle global errors like 401
    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    if (window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }

  // Admin API methods (for /api/v1/admin/* endpoints)
  async get<T = any>(url: string, config?: any) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: any) {
    // If data is FormData, don't set Content-Type (let browser set it with boundary)
    const headers = data instanceof FormData 
      ? { ...config?.headers } 
      : { 'Content-Type': 'application/json', ...config?.headers };
    
    const response = await this.client.post<T>(url, data, { 
      ...config, 
      headers 
    });
    return response.data;
  }

  async put<T = any>(url: string, data?: any) {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T = any>(url: string) {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  // Auth API methods (for /api/v1/auth/* endpoints)
  async authGet<T = any>(url: string, params?: any) {
    const response = await this.authClient.get<T>(url, { params });
    return response.data;
  }

  async authPost<T = any>(url: string, data?: any) {
    const response = await this.authClient.post<T>(url, data);
    return response.data;
  }

  async authPut<T = any>(url: string, data?: any) {
    const response = await this.authClient.put<T>(url, data);
    return response.data;
  }

  async authDelete<T = any>(url: string) {
    const response = await this.authClient.delete<T>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
