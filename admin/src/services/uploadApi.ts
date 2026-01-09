import { apiClient } from '@/lib/apiClient';

/**
 * Generic file upload API
 * Reusable for all file uploads across the admin panel
 */

export interface FileUploadResult {
  url: string;
  objectKey: string;
  fileName: string;
  contentType: string;
  size: number;
}

export type UploadPrefix = 'blog' | 'template' | 'landing' | 'general' | 'avatar' | 'product';

/**
 * Upload an image file to MinIO storage
 * @param file - File to upload
 * @param prefix - Storage prefix for categorization (default: 'general')
 * @returns Upload result with URL and metadata
 */
export async function uploadImage(
  file: File, 
  prefix: UploadPrefix = 'general'
): Promise<FileUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  
  // Use apiClient which already has base URL and auth configured
  // Note: apiClient.post handles FormData correctly (doesn't set Content-Type to allow browser to set boundary)
  const response = await apiClient.post<FileUploadResult>(
    `/uploads/images?prefix=${prefix}`,
    formData
  );
  return response;
}

/**
 * Delete a file from MinIO storage
 * @param objectKey - Object key returned from upload
 */
export async function deleteFile(objectKey: string): Promise<void> {
  const encodedKey = encodeURIComponent(objectKey);
  await apiClient.delete(`/uploads/${encodedKey}`);
}

/**
 * Upload result type for convenience
 */
export type { FileUploadResult as UploadResult };

