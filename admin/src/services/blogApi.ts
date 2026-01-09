import { apiClient } from '@/lib/apiClient';
import type { PagedResponse } from '@/types/api';

export type BlogPostStatus = 'Draft' | 'Published';

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl?: string;
  status: BlogPostStatus;
  publishedAt?: string;
  createdAt: string;
  modifiedAt?: string;
}

export interface BlogPostResponse {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  contentHtml: string;
  contentJson?: string;
  coverImageUrl?: string;
  buttonLinkUrl?: string;
  buttonText?: string;
  buttonColor: string;
  buttonTextColor: string;
  status: BlogPostStatus;
  publishedAt?: string;
  createdAt: string;
  modifiedAt?: string;
  createdBy?: string;
}

export interface BlogPostCreateRequest {
  title: string;
  shortDescription: string;
  contentHtml: string;
  contentJson?: string;
  coverImageUrl?: string;
  buttonLinkUrl?: string;
  buttonText?: string;
  buttonColor: string;
  buttonTextColor: string;
  status: BlogPostStatus;
}

export interface BlogPostUpdateRequest extends BlogPostCreateRequest {}

export interface FileUploadResponse {
  url: string;
  objectKey: string;
  fileName: string;
  contentType: string;
  size: number;
}

export const blogPostsApi = {
  list: async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: BlogPostStatus;
  }): Promise<PagedResponse<BlogPostListItem>> => {
    const response = await apiClient.get('/blog-posts', { params });
    return response.data;
  },

  getById: async (id: string): Promise<BlogPostResponse> => {
    const response = await apiClient.get(`/blog-posts/${id}`);
    return response.data;
  },

  create: async (data: BlogPostCreateRequest): Promise<BlogPostResponse> => {
    const response = await apiClient.post('/blog-posts', data);
    return response.data;
  },

  update: async (id: string, data: BlogPostUpdateRequest): Promise<BlogPostResponse> => {
    const response = await apiClient.put(`/blog-posts/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blog-posts/${id}`);
  },

  uploadImage: async (file: File): Promise<FileUploadResponse> => {
    // Use generic upload API with 'blog' prefix
    const { uploadImage } = await import('@/services/uploadApi');
    return uploadImage(file, 'blog');
  },
};

