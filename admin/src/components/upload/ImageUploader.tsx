import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { uploadImage, type UploadPrefix } from '@/services/uploadApi';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  prefix?: UploadPrefix;
  maxSizeMB?: number;
  className?: string;
  showPreview?: boolean;
  previewHeight?: string;
}

/**
 * Reusable Image Uploader Component
 * 
 * Usage:
 * ```tsx
 * <ImageUploader
 *   value={coverImageUrl}
 *   onChange={(url) => setFormData(prev => ({ ...prev, coverImageUrl: url }))}
 *   prefix="blog"
 *   showPreview
 * />
 * ```
 */
export function ImageUploader({
  value,
  onChange,
  onRemove,
  prefix = 'general',
  maxSizeMB = 5,
  className = '',
  showPreview = true,
  previewHeight = 'h-32',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const result = await uploadImage(file, prefix);
      onChange(result.url);
      setPreview(result.url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
      setPreview(value || '');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (onRemove) onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {showPreview && preview && (
        <div className="mb-3 relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className={`${previewHeight} w-auto rounded border border-slate-300 dark:border-slate-600 object-cover`} 
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors disabled:opacity-50"
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={isUploading}
          className="flex-1"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {preview ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </Button>

        {preview && !isUploading && (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
        Max size: {maxSizeMB}MB. Supported formats: JPG, PNG, GIF, WebP
      </p>
    </div>
  );
}

