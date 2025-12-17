import React from 'react';
import { HealthCheck, MonitoringStatus } from '@/types/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface SystemStatusProps {
  health: HealthCheck[];
  monitoring?: MonitoringStatus;
}

export function SystemStatus({ health, monitoring }: SystemStatusProps) {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          System Status
        </h3>
        <div className="space-y-3">
          {health.length > 0 ? (
            health.map((check) => (
              <div key={check.service} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {check.status === 'healthy' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {check.service}
                  </span>
                </div>
                <Badge variant={check.status === 'healthy' ? 'success' : 'error'}>
                  {check.status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">No health data available</span>
            </div>
          )}

          {monitoring && (
            <>
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Webhooks</p>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Active: {monitoring.webhooks.active} / {monitoring.webhooks.total}
                  {monitoring.webhooks.failed > 0 && (
                    <span className="text-red-600 dark:text-red-400 ml-2">
                      ({monitoring.webhooks.failed} failed)
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Background Jobs</p>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Running: {monitoring.jobs.running} / {monitoring.jobs.total}
                  {monitoring.jobs.failed > 0 && (
                    <span className="text-red-600 dark:text-red-400 ml-2">
                      ({monitoring.jobs.failed} failed)
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

