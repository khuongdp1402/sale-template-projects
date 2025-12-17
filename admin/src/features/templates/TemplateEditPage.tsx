import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { apiClient } from '@/lib/apiClient';
import { Template } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save } from 'lucide-react';

const templateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  templateType: z.enum(['Service', 'E-commerce', 'Landing']),
  audience: z.enum(['B2B', 'B2C', 'Both']),
  shortDescription: z.string().min(1, 'Short description is required'),
  longDescription: z.string().optional(),
  price: z.number().min(0),
  originalPrice: z.number().optional(),
  currency: z.string().default('USD'),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  isPopular: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isHot: z.boolean().default(false),
  popularityScore: z.number().min(0).max(100).default(0),
  coverImage: z.string().url('Invalid URL').optional(),
  thumbnailImage: z.string().url('Invalid URL').optional(),
  demoVideoUrl: z.string().url('Invalid URL').optional(),
  features: z.array(z.string()).default([]),
  customers: z.array(z.string()).default([]),
  similarTemplateIds: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

export function TemplateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { data: template, isLoading } = useQuery<Template>({
    queryKey: ['template', id],
    queryFn: async () => {
      const response = await apiClient.get(`/api/admin/templates/${id}`);
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
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateType: 'Service',
      audience: 'Both',
      currency: 'USD',
      categories: [],
      tags: [],
      isPopular: false,
      isNew: false,
      isHot: false,
      popularityScore: 0,
      features: [],
      customers: [],
      similarTemplateIds: [],
      status: 'draft',
    },
  });

  useEffect(() => {
    if (template) {
      Object.entries(template).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [template, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: TemplateFormData) => {
      if (isEdit) {
        await apiClient.put(`/api/admin/templates/${id}`, data);
      } else {
        await apiClient.post('/api/admin/templates', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      navigate('/admin/templates');
    },
  });

  const onSubmit = (data: TemplateFormData) => {
    mutation.mutate(data);
  };

  if (isEdit && isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title={isEdit ? 'Edit Template' : 'New Template'} />
      <PageHeader
        title={isEdit ? 'Edit Template' : 'New Template'}
        actions={
          <Button variant="outline" onClick={() => navigate('/admin/templates')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name *
                </label>
                <Input {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Slug *
                </label>
                <Input {...register('slug')} />
                {errors.slug && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Type *
                </label>
                <select
                  {...register('templateType')}
                  className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
                >
                  <option value="Service">Service</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Landing">Landing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Audience *
                </label>
                <select
                  {...register('audience')}
                  className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
                >
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Short Description *
              </label>
              <textarea
                {...register('shortDescription')}
                rows={3}
                className="flex w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
              />
              {errors.shortDescription && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Long Description
              </label>
              <textarea
                {...register('longDescription')}
                rows={5}
                className="flex w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Price *
                </label>
                <Input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
                {errors.price && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Original Price
                </label>
                <Input type="number" step="0.01" {...register('originalPrice', { valueAsNumber: true })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Currency
                </label>
                <Input {...register('currency')} />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('isPopular')} />
                <span className="text-sm text-slate-700 dark:text-slate-300">Popular</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('isNew')} />
                <span className="text-sm text-slate-700 dark:text-slate-300">New</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('isHot')} />
                <span className="text-sm text-slate-700 dark:text-slate-300">Hot</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Popularity Score (0-100)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register('popularityScore', { valueAsNumber: true })}
              />
            </div>
          </div>
        </Card>

        {/* Media */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Media</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Cover Image URL
              </label>
              <Input {...register('coverImage')} placeholder="https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Thumbnail Image URL
              </label>
              <Input {...register('thumbnailImage')} placeholder="https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Demo Video URL
              </label>
              <Input {...register('demoVideoUrl')} placeholder="https://..." />
            </div>
          </div>
        </Card>

        {/* Status */}
        <Card>
          <div className="p-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/templates')}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {mutation.isPending ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </>
  );
}

