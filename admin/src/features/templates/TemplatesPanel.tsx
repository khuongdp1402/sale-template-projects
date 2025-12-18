import { PanelMode } from '@/app/panel/RightPanelContext';
import { useTemplatesQuery } from '@/hooks/adminHooks';
import { Template } from '@/types/api';
import { formatCurrency, formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TemplatesPanelProps {
  mode?: PanelMode;
  id?: string;
  onClose: () => void;
}

export function TemplatesPanel({ mode = 'detail', id, onClose }: TemplatesPanelProps) {
  const { data, isLoading } = useTemplatesQuery({ page: 1, pageSize: 50 });
  const template: Template | undefined = id
    ? data?.items.find((t) => t.id === id)
    : undefined;

  if (isLoading && id) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
        <div className="h-40 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {mode === 'create'
            ? 'Create Template'
            : mode === 'edit'
            ? 'Edit Template'
            : 'Template Details'}
        </h2>
        {template && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 truncate">
            /{template.slug}
          </p>
        )}
      </div>

      {template && (
        <div className="space-y-4 text-sm">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-slate-900 dark:text-white font-medium mb-1">{template.name}</p>
            <p className="text-xs text-slate-500 mb-2">
              Created {formatDate(template.createdAt)}
            </p>
            <Badge variant="secondary" className="mr-2">
              {template.templateType}
            </Badge>
            <Badge variant="success">{template.status}</Badge>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between">
            <span className="text-xs text-slate-500 uppercase">Price</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(template.price, template.currency)}
            </span>
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
