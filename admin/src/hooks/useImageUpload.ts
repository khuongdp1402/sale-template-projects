import { useState } from 'react';
import { uploadImage, deleteFile, type UploadPrefix } from '@/services/uploadApi';

interface UseImageUploadOptions {
  prefix?: UploadPrefix;
  maxSizeMB?: number;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  upload: (file: File) => Promise<string | null>;
  remove: (objectKey: string) => Promise<void>;
  isUploading: boolean;
  error: Error | null;
}

/**
 * Reusable hook for image upload
 * 
 * Usage:
 * ```tsx
 * const { upload, isUploading } = useImageUpload({
 *   prefix: 'blog',
 *   onSuccess: (url) => setFormData(prev => ({ ...prev, coverImageUrl: url }))
 * });
 * 
 * const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (file) await upload(file);
 * };
 * ```
 */
export function useImageUpload({
  prefix = 'general',
  maxSizeMB = 5,
  onSuccess,
  onError,
}: UseImageUploadOptions = {}): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      const err = new Error('Please select an image file');
      setError(err);
      onError?.(err);
      return null;
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      const err = new Error(`File size must be less than ${maxSizeMB}MB`);
      setError(err);
      onError?.(err);
      return null;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadImage(file, prefix);
      onSuccess?.(result.url);
      return result.url;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      onError?.(error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const remove = async (objectKey: string): Promise<void> => {
    try {
      await deleteFile(objectKey);
    } catch (err) {
      console.error('Failed to delete file:', err);
      throw err;
    }
  };

  return {
    upload,
    remove,
    isUploading,
    error,
  };
}

