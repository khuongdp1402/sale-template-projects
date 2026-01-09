import { useLogsQuery } from '@/hooks/adminHooks';
import { Card } from '@/components/ui/Card';
// import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime } from '@/lib/format';
import { Activity, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentActivity() {
  const { data: logsData } = useLogsQuery({ pageSize: 8 });
  const logs = logsData?.items || [];

  return (
    <Card className="flex flex-col h-full overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-blue-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Audit Trail</h3>
        </div>
        <Clock className="h-4 w-4 text-slate-400" />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {logs.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium line-clamp-2 leading-snug">
                      {log.message}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <span className="uppercase font-bold tracking-tighter opacity-70">{log.type}</span>
                      <span>•</span>
                      {formatRelativeTime(log.createdAt)}
                    </p>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                    log.severity === 'error' ? "bg-red-500" : log.severity === 'warn' ? "bg-amber-500" : "bg-blue-500"
                  )} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
            <Activity className="h-10 w-10 text-slate-200 mb-2" />
            <p className="text-sm text-slate-500 font-medium">No recent activity detected</p>
          </div>
        )}
      </div>
    </Card>
  );
}
