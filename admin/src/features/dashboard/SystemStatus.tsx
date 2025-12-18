import { HealthCheck, MonitoringStatus } from '@/types/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, XCircle, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStatusProps {
  health: HealthCheck[];
  monitoring?: MonitoringStatus;
}

export function SystemStatus({ health, monitoring }: SystemStatusProps) {
  return (
    <Card className="flex flex-col h-full border-slate-200 dark:border-slate-800">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-green-500" />
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">System Health</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Main Services */}
        <div className="space-y-2">
          {health.map((check) => (
            <div key={check.service} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-slate-800/50">
              <div className="flex items-center gap-3">
                {check.status === 'healthy' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                  {check.service}
                </span>
              </div>
              <Badge 
                variant={check.status === 'healthy' ? 'success' : 'destructive'} 
                className="text-[9px] px-1.5 py-0 min-w-[50px] justify-center h-5"
              >
                {check.status === 'healthy' ? 'Online' : 'Offline'}
              </Badge>
            </div>
          ))}
        </div>

        {/* Sub-monitoring stats */}
        {monitoring && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-100 dark:border-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-3 w-3 text-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Jobs</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">{monitoring.jobs.running}</p>
                <span className="text-[10px] text-slate-400">of {monitoring.jobs.total}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-100 dark:border-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-3 w-3 text-purple-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Hooks</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-slate-900 dark:text-white leading-none">{monitoring.webhooks.active}</p>
                <span className={cn(
                  "text-[10px]",
                  monitoring.webhooks.failed > 0 ? "text-red-500 font-bold" : "text-slate-400"
                )}>
                  {monitoring.webhooks.failed} fail
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
