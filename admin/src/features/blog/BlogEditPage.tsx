import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { blogPostsApi, type BlogPostCreateRequest, type BlogPostResponse } from '@/services/blogApi';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { ArrowLeft, Save, Eye } from 'lucide-react';

export function BlogEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!id;

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

  const { data: post, isLoading } = useQuery<BlogPostResponse>({
    queryKey: ['blogPost', id],
    queryFn: () => blogPostsApi.getById(id!),
    enabled: isEdit && !!id,
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
    }
  }, [post, isEdit]);

  const createMutation = useMutation({
    mutationFn: blogPostsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      navigate('/admin/blog');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BlogPostCreateRequest) => blogPostsApi.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', id] });
      navigate('/admin/blog');
    },
  });

  const handleSubmit = async (status: 'Draft' | 'Published') => {
    const data = { ...formData, status };
    
    if (isEdit) {
      await updateMutation.mutateAsync(data);
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="space-y-4 text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={isEdit ? 'Edit Blog Post' : 'New Blog Post'} />
      
      <div className="animate-fade-in">
        <PageHeader
          title={isEdit ? 'Edit Blog Post' : 'New Blog Post'}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/admin/blog')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          }
        />

        <div className="space-y-6 animate-slide-in">
          {/* Title */}
          <Card className="p-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter post title"
              />
            </div>
          </Card>

          {/* Short Description */}
          <Card className="p-6">
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
          </Card>

          {/* Cover Image */}
          <Card className="p-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Cover Image</label>
              <ImageUploader
                value={formData.coverImageUrl}
                onChange={(url) => setFormData(prev => ({ ...prev, coverImageUrl: url }))}
                prefix="blog"
                maxSizeMB={5}
                showPreview
                previewHeight="h-40"
              />
            </div>
          </Card>

          {/* Content Editor */}
          <Card className="p-6">
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
          </Card>

          {/* CTA Button Config */}
          <Card className="p-6">
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
          <Card className="p-6">
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
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/blog')}
            >
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
      </div>
    </>
  );
}
