/**
 * Environment configuration for the Admin app.
 * Built to be gateway-ready and easily switchable between mock/real modes.
 */

const API_MODE = (import.meta.env.VITE_API_MODE || 'mock') as 'mock' | 'real';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';
const API_ADMIN_PREFIX = import.meta.env.VITE_API_ADMIN_PREFIX || '/api/{version}/admin';
const API_TIMEOUT_MS = parseInt(import.meta.env.VITE_API_TIMEOUT_MS || '15000', 10);

// Compute the final admin API base path
const ADMIN_API_BASE = `${API_BASE_URL}${API_ADMIN_PREFIX.replace('{version}', API_VERSION)}`;

export const env = {
  isMock: API_MODE === 'mock',
  apiBaseUrl: API_BASE_URL,
  apiVersion: API_VERSION,
  adminApiBase: ADMIN_API_BASE,
  timeout: API_TIMEOUT_MS,
  environment: import.meta.env.MODE,
};
