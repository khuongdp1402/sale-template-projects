import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'There is no data to display.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon || <Inbox className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />}
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      {action}
    </div>
  );
}

