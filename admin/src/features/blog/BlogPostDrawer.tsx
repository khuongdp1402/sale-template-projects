import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SlidingPanel } from '@/components/common/SlidingPanel';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { blogPostsApi, type BlogPostCreateRequest, type BlogPostResponse } from '@/services/blogApi';
import { Save, X, Eye } from 'lucide-react';

interface BlogPostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string | null;
}

export function BlogPostDrawer({ isOpen, onClose, postId }: BlogPostDrawerProps) {
  const queryClient = useQueryClient();
  const isEdit = !!postId;

  const [formData, setFormData] = useState<BlogPostCreateRequest>({
    title: '',
    shortDescription: '',
    contentHtml: '',
    contentJson: undefined,
    coverImageUrl: '',
    buttonLinkUrl: '',
    buttonText: '',
    buttonColor: '#111111',
    buttonTextColor: '#FFFFFF',
    status: 'Draft',
  });

  // const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');

  // Fetch post data for edit
  const { data: post, isLoading } = useQuery<BlogPostResponse>({
    queryKey: ['blogPost', postId],
    queryFn: () => blogPostsApi.getById(postId!),
    enabled: isEdit && !!postId,
  });

  // Load post data into form
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        shortDescription: post.shortDescription,
        contentHtml: post.contentHtml,
        contentJson: post.contentJson,
        coverImageUrl: post.coverImageUrl || '',
        buttonLinkUrl: post.buttonLinkUrl || '',
        buttonText: post.buttonText || '',
        buttonColor: post.buttonColor,
        buttonTextColor: post.buttonTextColor,
        status: post.status,
      });
      if (post.coverImageUrl) {
        setCoverImagePreview(post.coverImageUrl);
      }
    } else if (!isEdit) {
      // Reset form for create
      setFormData({
        title: '',
        shortDescription: '',
        contentHtml: '',
        contentJson: undefined,
        coverImageUrl: '',
        buttonLinkUrl: '',
        buttonText: '',
        buttonColor: '#111111',
        buttonTextColor: '#FFFFFF',
        status: 'Draft',
      });
      setCoverImagePreview('');
      // setCoverImageFile(null); // Removed - not needed
    }
  }, [post, isEdit]);

  const createMutation = useMutation({
    mutationFn: blogPostsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BlogPostCreateRequest) => blogPostsApi.update(postId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      onClose();
    },
  });

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setCoverImageFile(file); // Removed - not needed
    
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      const result = await blogPostsApi.uploadImage(file);
      setFormData(prev => ({ ...prev, coverImageUrl: result.url }));
    } catch (error) {
      console.error('Failed to upload cover image:', error);
      alert('Failed to upload cover image');
    }
  };

  const handleSubmit = async (status: 'Draft' | 'Published') => {
    // Validate required fields
    if (!formData.title || formData.title.length < 3) {
      alert('Title must be at least 3 characters');
      return;
    }
    
    if (!formData.contentHtml) {
      alert('Content is required');
      return;
    }
    
    // Clean up button fields: if one is empty, clear both
    const data = { ...formData, status };
    if (!data.buttonText || !data.buttonLinkUrl) {
      data.buttonText = '';
      data.buttonLinkUrl = '';
    }
    
    // Validate button URL if provided
    if (data.buttonLinkUrl && !data.buttonLinkUrl.startsWith('http://') && !data.buttonLinkUrl.startsWith('https://')) {
      alert('Button Link URL must start with http:// or https://');
      return;
    }
    
    if (isEdit) {
      await updateMutation.mutateAsync(data);
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <SlidingPanel
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Blog Post' : 'Create Blog Post'}
      width="xl"
    >
      {isLoading && isEdit ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter post title"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Short Description * <span className="text-xs text-slate-500">({formData.shortDescription.length}/500)</span>
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => {
                const value = e.target.value.slice(0, 500);
                setFormData(prev => ({ ...prev, shortDescription: value }));
              }}
              rows={3}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
              placeholder="Brief description (max 500 characters)"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Cover Image</label>
            {coverImagePreview && (
              <div className="mb-2 relative inline-block">
                <img src={coverImagePreview} alt="Cover" className="h-32 w-auto rounded border" />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImagePreview('');
                    setFormData(prev => ({ ...prev, coverImageUrl: '' }));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="text-sm"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Content *</label>
            <TipTapEditor
              content={formData.contentHtml}
              onChange={(html, json) => {
                setFormData(prev => ({
                  ...prev,
                  contentHtml: html,
                  contentJson: json,
                }));
              }}
              placeholder="Start writing your blog post content..."
            />
          </div>

          {/* CTA Button Config */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">CTA Button (Optional)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Button Text</label>
                  <Input
                    value={formData.buttonText}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Get Started"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Button Link URL</label>
                  <Input
                    value={formData.buttonLinkUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonLinkUrl: e.target.value }))}
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Button Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.buttonColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonColor: e.target.value }))}
                      className="h-10 w-20 rounded border"
                    />
                    <Input
                      value={formData.buttonColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.buttonTextColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonTextColor: e.target.value }))}
                      className="h-10 w-20 rounded border"
                    />
                    <Input
                      value={formData.buttonTextColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonTextColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              {formData.buttonText && formData.buttonLinkUrl && (
                <div className="pt-2 border-t">
                  <label className="block text-sm font-medium mb-2">Preview</label>
                  <a
                    href={formData.buttonLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded text-sm font-medium"
                    style={{
                      backgroundColor: formData.buttonColor,
                      color: formData.buttonTextColor,
                    }}
                  >
                    {formData.buttonText}
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Draft' | 'Published' }))}
              className="h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit('Draft')}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSubmit('Published')}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      )}
    </SlidingPanel>
  );
}

