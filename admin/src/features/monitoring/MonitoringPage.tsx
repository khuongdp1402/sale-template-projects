import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { monitoringApi } from '@/services/adminApi';
import { HealthCheck, Log } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatDateTime } from '@/lib/format';
import { CheckCircle2, XCircle } from 'lucide-react';

// Mock data for preview
const mockHealth: HealthCheck[] = [
  { service: 'API', status: 'healthy', timestamp: new Date().toISOString() },
  { service: 'Database', status: 'healthy', timestamp: new Date().toISOString() },
  { service: 'Background Jobs', status: 'healthy', timestamp: new Date().toISOString() },
];

const mockWebhooks = { total: 12, active: 10, failed: 2 };
const mockJobs = { total: 5, running: 2, failed: 0 };

const mockIncidents: Log[] = [
  {
    id: '1',
    type: 'Payment',
    severity: 'Error',
    message: 'Payment processing failed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    type: 'Infra',
    severity: 'Warn',
    message: 'High CPU usage detected',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function MonitoringPage() {
  const { data: health } = useQuery<HealthCheck[]>({
    queryKey: ['monitoring', 'health'],
    queryFn: async () => {
      try {
        return await monitoringApi.getHealth();
      } catch {
        return mockHealth;
      }
    },
    refetchInterval: 30000,
  });

  const { data: webhooks } = useQuery({
    queryKey: ['monitoring', 'webhooks'],
    queryFn: async () => {
      try {
        return await monitoringApi.getWebhooks();
      } catch {
        return mockWebhooks;
      }
    },
    refetchInterval: 60000,
  });

  const { data: jobs } = useQuery({
    queryKey: ['monitoring', 'jobs'],
    queryFn: async () => {
      try {
        return await monitoringApi.getJobs();
      } catch {
        return mockJobs;
      }
    },
    refetchInterval: 60000,
  });

  const { data: incidents } = useQuery<Log[]>({
    queryKey: ['monitoring', 'incidents'],
    queryFn: async () => {
      try {
        return await monitoringApi.getIncidents();
      } catch {
        return mockIncidents;
      }
    },
    refetchInterval: 60000,
  });

  return (
    <>
      <SEO title="Monitoring" />
      <PageHeader title="System Monitoring" description="Monitor system health and status" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Health Checks */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Health Checks
            </h3>
            <div className="space-y-3">
              {health && health.length > 0 ? (
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
                <p className="text-sm text-slate-600 dark:text-slate-400">No health data available</p>
              )}
            </div>
          </div>
        </Card>

        {/* Webhooks */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Webhooks</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total</span>
                <span className="font-medium">{webhooks?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Active</span>
                <Badge variant="success">{webhooks?.active || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Failed</span>
                {webhooks && webhooks.failed > 0 ? (
                  <Badge variant="error">{webhooks.failed}</Badge>
                ) : (
                  <span className="text-sm">0</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Background Jobs */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Background Jobs</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total</span>
                <span className="font-medium">{jobs?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Running</span>
                <Badge variant="warning">{jobs?.running || 0}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Failed</span>
                {jobs && jobs.failed > 0 ? (
                  <Badge variant="error">{jobs.failed}</Badge>
                ) : (
                  <span className="text-sm">0</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Incidents</h3>
          {incidents && incidents.length > 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {formatDateTime(incident.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="info">{incident.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            incident.severity === 'Error'
                              ? 'error'
                              : incident.severity === 'Warn'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400">No recent incidents</p>
          )}
        </div>
      </Card>
    </>
  );
}

