import { PanelMode } from '@/app/panel/RightPanelContext';
import { useUsersQuery } from '@/hooks/useUsers';
import { User } from '@/types/api';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface UsersPanelProps {
  mode?: PanelMode;
  id?: string;
  onClose: () => void;
}

export function UsersPanel({ mode = 'detail', id, onClose }: UsersPanelProps) {
  const isDetail = mode !== 'create' && !!id;

  const { data, isLoading } = useUsersQuery({ page: 1, pageSize: 100 });
  const user: User | undefined = isDetail
    ? data?.items.find((u) => u.id === id)
    : undefined;

  if (isLoading && isDetail) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
        <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {mode === 'create'
            ? 'Create User'
            : mode === 'edit'
            ? 'Edit User'
            : 'User Details'}
        </h2>
        {user && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            ID: <span className="font-mono text-xs">{user.id}</span>
          </p>
        )}
      </div>

      {user && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Profile</p>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3 space-y-1 text-sm">
              <p className="text-slate-900 dark:text-white">{user.username}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">{user.email}</p>
              <p className="text-xs text-slate-500 mt-1">
                Joined: {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Roles</p>
            <div className="flex flex-wrap gap-1.5">
              {user.roles.map((r) => (
                <Badge key={r} variant="secondary" className="text-xs">
                  {r}
                </Badge>
              ))}
            </div>
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
