import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { apiClient } from '@/lib/apiClient';
import { BlogPost } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save, Eye } from 'lucide-react';

// Schema matching backend CreateBlogPostRequest
const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').max(100, 'Slug too long'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  contentMd: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  tagsCsv: z.string().optional(),
  coverImage: z.string().url('Invalid URL').optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

export function BlogEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      const response = await apiClient.get(`/api/admin/blog/posts/${id}`);
      return response.data;
    },
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      status: 'draft',
      isFeatured: false,
      tagsCsv: '',
      coverImage: '',
    },
  });

  // Watch title for auto-generating slug
  const title = watch('title');
  useEffect(() => {
    if (!isEdit && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [title, isEdit, setValue]);

  useEffect(() => {
    if (post) {
      Object.entries(post).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [post, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      if (isEdit) {
        await apiClient.put(`/api/admin/blog/posts/${id}`, data);
      } else {
        await apiClient.post('/api/admin/blog/posts', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      navigate('/admin/blog');
    },
  });

  const onSubmit = (data: BlogPostFormData) => {
    mutation.mutate(data);
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
              {isEdit && (
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>
          }
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-in">
          {/* Basic Info */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-sky-500 rounded-full"></div>
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Title *
                  </label>
                  <Input 
                    {...register('title')} 
                    placeholder="Enter an engaging title"
                    className="transition-all duration-200 focus:scale-[1.01]"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1 animate-shake">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Slug * <span className="text-xs text-slate-500">(URL-friendly)</span>
                  </label>
                  <Input 
                    {...register('slug')} 
                    placeholder="auto-generated-from-title"
                    className="font-mono text-sm"
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1 animate-shake">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      {...register('category')}
                      className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="">Select a category</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Product">Product</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Tags <span className="text-xs text-slate-500">(comma-separated)</span>
                    </label>
                    <Input 
                      {...register('tagsCsv')} 
                      placeholder="react, typescript, tutorial"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Excerpt * <span className="text-xs text-slate-500">(Short description)</span>
                  </label>
                  <textarea
                    {...register('excerpt')}
                    rows={3}
                    placeholder="Brief summary of your post (max 500 characters)"
                    className="flex w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-sky-500/20 resize-none"
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1 animate-shake">
                      {errors.excerpt.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Content */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                Content
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Content * <span className="text-xs text-slate-500">(Markdown supported)</span>
                </label>
                <textarea
                  {...register('contentMd')}
                  rows={20}
                  placeholder="Write your content here using Markdown...&#10;&#10;## Heading 2&#10;### Heading 3&#10;&#10;**Bold text**&#10;*Italic text*&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;[Link text](https://example.com)"
                  className="flex w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm font-mono transition-all focus:ring-2 focus:ring-sky-500/20 resize-y"
                />
                {errors.contentMd && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1 animate-shake">
                    {errors.contentMd.message}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Media */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                Media
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Cover Image URL
                </label>
                <Input 
                  {...register('coverImage')} 
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                {errors.coverImage && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {errors.coverImage.message}
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  Recommended: 1200x630px (16:9 ratio)
                </p>
              </div>
            </div>
          </Card>

          {/* Publishing Options */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                Publishing Options
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="flex h-10 w-full md:w-64 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      {...register('isFeatured')} 
                      className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 transition-all"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-sky-600 transition-colors">
                      Featured Post <span className="text-xs text-slate-500">(Show on homepage)</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-8 animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/blog')}
              className="transition-all hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={mutation.isPending}
              className="transition-all hover:scale-105"
            >
              <Save className="h-4 w-4 mr-2" />
              {mutation.isPending ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

