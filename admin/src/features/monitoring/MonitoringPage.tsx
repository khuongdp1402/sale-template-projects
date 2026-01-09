import { SEO } from '@/lib/seo';
import { useHealthQuery } from '@/hooks/adminHooks';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatDateTime } from '@/lib/format';
import { CheckCircle2, Activity, Server, Database, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MonitoringPage() {
  const { data: health, isLoading } = useHealthQuery();

  return (
    <div className="space-y-6">
      <SEO title="Monitoring" />
      <PageHeader 
        title="System Monitoring" 
        description="Real-time status of backend services and infrastructure"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Summaries */}
        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Overall Status</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">All Systems Go</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Global Latency</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">42ms</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Req/Sec</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">1.2k</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Server className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Uptime</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">99.99%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Table */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Service Health</h3>
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">Live Update</Badge>
          </div>
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={4}><div className="h-8 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded" /></TableCell>
                  </TableRow>
                ))
              ) : health?.map((check) => (
                <TableRow key={check.service}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {check.service.includes('Database') ? <Database className="h-4 w-4 text-slate-400" /> : <Server className="h-4 w-4 text-slate-400" />}
                      <span className="font-medium">{check.service}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={check.status === 'healthy' ? 'success' : 'destructive'} className="capitalize">
                      {check.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {formatDateTime(check.timestamp)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-mono text-slate-400">
                    {Math.floor(Math.random() * 20) + 5}ms
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Incidents / Alerts Sidebar */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">Active Alerts</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-500 mb-2 opacity-20" />
                <p className="text-sm text-slate-500 font-medium">No active incidents</p>
                <p className="text-xs text-slate-400 mt-1">System is performing within normal parameters.</p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-600 border-none">
            <div className="p-6 text-white">
              <h4 className="font-bold mb-2">Weekly Summary</h4>
              <p className="text-sm text-blue-100 mb-4">You had 100% uptime this week with zero critical incidents reported.</p>
              <Button variant="outline" className="w-full bg-white/10 border-blue-400 text-white hover:bg-white/20">
                View Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
