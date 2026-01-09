import { env } from '../config/env';
import { apiClient } from '../lib/apiClient';
// import { mockServer } from './mock/mockServer';

/**
 * ApiAdapter handles the switch between Mock and Real implementations.
 * It provides a unified way to call backend services.
 */
export const createApiCall = <TArgs extends any[], TResult>(
  realCall: (...args: TArgs) => Promise<TResult>,
  mockCall: (...args: TArgs) => Promise<TResult>
) => {
  return (...args: TArgs): Promise<TResult> => {
    if (env.isMock) {
      // Simulate network delay
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockCall(...args)), 300);
      });
    }
    return realCall(...args);
  };
};

/**
 * Shared apiClient helpers
 */
export const api = {
  get: <T>(url: string, params?: any) => apiClient.get<T>(url, params),
  post: <T>(url: string, data?: any) => apiClient.post<T>(url, data),
  put: <T>(url: string, data?: any) => apiClient.put<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
};
