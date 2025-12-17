import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { Log } from '@/types/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime } from '@/lib/format';
import { Activity } from 'lucide-react';

export function RecentActivity() {
  const { data: logs } = useQuery<Log[]>({
    queryKey: ['recent-logs'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/api/admin/logs', {
          params: { limit: 10, sortBy: 'createdAt', sortOrder: 'desc' },
        });
        return response.data.data || [];
      } catch {
        return [];
      }
    },
    refetchInterval: 30000,
  });

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-slate-900 dark:text-white">{log.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formatRelativeTime(log.createdAt)}
                  </p>
                </div>
                <Badge
                  variant={
                    log.severity === 'error'
                      ? 'error'
                      : log.severity === 'warn'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {log.type}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400">No recent activity</p>
          )}
        </div>
      </div>
    </Card>
  );
}

