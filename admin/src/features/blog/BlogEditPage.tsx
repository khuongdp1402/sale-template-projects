import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/lib/seo';
import { PageHeader } from '@/components/common/PageHeader';

export function BlogEditPage() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <>
      <SEO title={isEdit ? 'Edit Blog Post' : 'New Blog Post'} />
      <PageHeader title={isEdit ? 'Edit Blog Post' : 'New Blog Post'} />
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">Blog editor coming soon</p>
      </div>
    </>
  );
}

