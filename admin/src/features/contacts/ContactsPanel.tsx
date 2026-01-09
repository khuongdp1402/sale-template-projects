import { PanelMode } from '@/app/panel/RightPanelContext';
import { useContactsQuery } from '@/hooks/adminHooks';
import { Contact } from '@/types/api';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ContactsPanelProps {
  mode?: PanelMode;
  id?: string;
  onClose: () => void;
}

export function ContactsPanel({ mode: _mode = 'detail', id, onClose }: ContactsPanelProps) {
  const { data, isLoading } = useContactsQuery({ page: 1, pageSize: 50 });
  const contact: Contact | undefined = id
    ? data?.items.find((c) => c.id === id)
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
          Contact Details
        </h2>
        {contact && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Created {formatDate(contact.createdAt)}
          </p>
        )}
      </div>

      {contact && (
        <div className="space-y-4 text-sm">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="font-medium text-slate-900 dark:text-white mb-1">{contact.name}</p>
            <p className="text-xs text-slate-500 mb-1">{contact.emailOrPhone}</p>
            <Badge variant={contact.status === 'Done' ? 'success' : contact.status === 'InProgress' ? 'warning' : 'info'}>
              {contact.status}
            </Badge>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/40">
            <p className="text-xs font-semibold text-slate-500 mb-1">Message</p>
            <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {contact.message}
            </p>
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
