import { PanelMode } from '@/app/panel/RightPanelContext';
import { useBlogPostsQuery } from '@/hooks/adminHooks';
import { BlogPost } from '@/types/api';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BlogPanelProps {
  mode?: PanelMode;
  id?: string;
  onClose: () => void;
}

export function BlogPanel({ mode = 'detail', id, onClose }: BlogPanelProps) {
  const { data, isLoading } = useBlogPostsQuery({ page: 1, pageSize: 50 });
  const post: BlogPost | undefined = id
    ? data?.items.find((p) => p.id === id)
    : undefined;

  if (isLoading && id) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
        <div className="h-40 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {mode === 'create'
            ? 'Create Post'
            : mode === 'edit'
            ? 'Edit Post'
            : 'Post Details'}
        </h2>
        {post && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 truncate">
            /{post.slug}
          </p>
        )}
      </div>

      {post && (
        <div className="space-y-4 text-sm">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-slate-900 dark:text-white font-medium mb-1">{post.title}</p>
            <p className="text-xs text-slate-500 mb-2">{formatDate(post.createdAt)}</p>
            <Badge variant="secondary" className="mr-2">
              {post.category}
            </Badge>
            <Badge variant={post.status === 'published' ? 'success' : 'default'}>
              {post.status}
            </Badge>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 max-h-64 overflow-y-auto text-sm whitespace-pre-wrap">
            {/* Content preview not available */}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
