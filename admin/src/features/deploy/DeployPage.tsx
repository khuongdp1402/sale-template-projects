import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { deploymentsApi } from '@/services/adminApi';
import { Deployment } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { formatDate } from '@/lib/format';
import { Rocket, Play, RotateCcw, Eye } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';

// Mock data for preview
const mockDeployments: Deployment[] = [
  {
    id: '1',
    environment: 'Prod',
    status: 'Success',
    commitHash: 'abc123def456',
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    finishedAt: new Date(Date.now() - 86350000).toISOString(),
  },
  {
    id: '2',
    environment: 'Staging',
    status: 'Running',
    commitHash: 'def789ghi012',
    startedAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '3',
    environment: 'Dev',
    status: 'Failed',
    commitHash: 'ghi345jkl678',
    startedAt: new Date(Date.now() - 172800000).toISOString(),
    finishedAt: new Date(Date.now() - 172700000).toISOString(),
  },
  {
    id: '4',
    environment: 'Prod',
    status: 'Queued',
    commitHash: 'jkl901mno234',
  },
];

export function DeployPage() {
  const queryClient = useQueryClient();
  const [triggerEnv, setTriggerEnv] = useState<string | null>(null);
  const [rollbackId, setRollbackId] = useState<string | null>(null);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);

  const { data, isLoading } = useQuery<Deployment[]>({
    queryKey: ['deployments'],
    queryFn: async () => {
      try {
        return await deploymentsApi.list();
      } catch {
        return mockDeployments;
      }
    },
    refetchInterval: 30000,
  });

  const triggerMutation = useMutation({
    mutationFn: (environment: string) => deploymentsApi.trigger(environment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
      setTriggerEnv(null);
    },
  });

  const rollbackMutation = useMutation({
    mutationFn: (id: string) => deploymentsApi.rollback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
      setRollbackId(null);
    },
  });

  return (
    <>
      <SEO title="Deployments" />
      <PageHeader
        title="Deployments"
        description="Manage deployments and infrastructure"
        actions={
          <div className="flex gap-2">
            <select
              value=""
              onChange={(e) => e.target.value && setTriggerEnv(e.target.value)}
              className="flex h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            >
              <option value="">Select Environment</option>
              <option value="Dev">Dev</option>
              <option value="Staging">Staging</option>
              <option value="Prod">Prod</option>
            </select>
            {triggerEnv && (
              <Button onClick={() => triggerMutation.mutate(triggerEnv)}>
                <Play className="h-4 w-4 mr-2" />
                Trigger Deploy
              </Button>
            )}
          </div>
        }
      />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState title="No deployments found" />
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Commit</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Finished</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((deployment) => (
                  <TableRow key={deployment.id}>
                    <TableCell>
                      <Badge variant="info">{deployment.environment}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          deployment.status === 'Success'
                            ? 'success'
                            : deployment.status === 'Failed'
                            ? 'error'
                            : deployment.status === 'Running'
                            ? 'warning'
                            : 'default'
                        }
                      >
                        {deployment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {deployment.commitHash?.slice(0, 7) || '-'}
                    </TableCell>
                    <TableCell>
                      {deployment.startedAt ? formatDate(deployment.startedAt) : '-'}
                    </TableCell>
                    <TableCell>
                      {deployment.finishedAt ? formatDate(deployment.finishedAt) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDeployment(deployment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {deployment.status === 'Success' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRollbackId(deployment.id)}
                            title="Rollback"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={!!triggerEnv}
        onClose={() => setTriggerEnv(null)}
        onConfirm={() => triggerEnv && triggerMutation.mutate(triggerEnv)}
        title="Trigger Deployment"
        message={`Are you sure you want to trigger a deployment to ${triggerEnv}?`}
        confirmText="Deploy"
      />

      <ConfirmDialog
        isOpen={!!rollbackId}
        onClose={() => setRollbackId(null)}
        onConfirm={() => rollbackId && rollbackMutation.mutate(rollbackId)}
        title="Rollback Deployment"
        message="Are you sure you want to rollback this deployment? This action cannot be undone."
        variant="destructive"
        confirmText="Rollback"
      />

      {/* Deployment Detail Modal */}
      {selectedDeployment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Deployment Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Environment</p>
                <Badge variant="info">{selectedDeployment.environment}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</p>
                <Badge
                  variant={
                    selectedDeployment.status === 'Success'
                      ? 'success'
                      : selectedDeployment.status === 'Failed'
                      ? 'error'
                      : selectedDeployment.status === 'Running'
                      ? 'warning'
                      : 'default'
                  }
                >
                  {selectedDeployment.status}
                </Badge>
              </div>
              {selectedDeployment.commitHash && (
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Commit Hash</p>
                  <p className="font-mono text-sm">{selectedDeployment.commitHash}</p>
                </div>
              )}
              {selectedDeployment.startedAt && (
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Started</p>
                  <p>{formatDate(selectedDeployment.startedAt)}</p>
                </div>
              )}
              {selectedDeployment.finishedAt && (
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Finished</p>
                  <p>{formatDate(selectedDeployment.finishedAt)}</p>
                </div>
              )}
              {selectedDeployment.logs && (
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Logs</p>
                  <pre className="p-3 bg-slate-100 dark:bg-slate-700 rounded text-xs overflow-x-auto max-h-64 overflow-y-auto">
                    {selectedDeployment.logs}
                  </pre>
                </div>
              )}
            </div>
            <Button className="mt-4" onClick={() => setSelectedDeployment(null)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}

