// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { adminDeployApi } from '@/services/admin';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import { Play, Eye, Rocket, Server, Activity, ShieldCheck, ExternalLink } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { Card } from '@/components/ui/Card';
import { FEATURES } from '@/config/features';
// import { cn } from '@/lib/utils';

export function DeployPage() {
  // const [selectedSite, setSelectedSite] = useState<any | null>(null);

  const { data: sites, isLoading } = useQuery({
    queryKey: ['deploy', 'sites'],
    queryFn: () => adminDeployApi.listSites(),
  });

  return (
    <div className="space-y-6">
      <SEO title="Deployments" />
      <PageHeader
        title="Infrastructure & Deploy"
        description="Manage cloud instances, customer sites and deployment pipelines"
        actions={
          <Button variant="default" size="sm" disabled={!FEATURES.enableDeployActions}>
            <Rocket className="h-4 w-4 mr-2" />
            New Deployment
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-600 border-none text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Server className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-100 font-medium uppercase">Active Sites</p>
              <p className="text-2xl font-bold">124</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Healthy Nodes</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">8 / 8</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Total Jobs (24h)</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,420</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white">Customer Sites</h3>
          <div className="flex gap-2">
            <select className="h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] px-2 py-1 text-xs outline-none">
              <option>All Regions</option>
              <option>US-East</option>
              <option>SG-1</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-lg" />
            ))}
          </div>
        ) : !sites || sites.length === 0 ? (
          <div className="p-12">
            <EmptyState 
              title="No active sites" 
              description="Deploy a template to a customer site to see it here."
              icon={<Server className="h-12 w-12 text-slate-300" />}
            />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Deploy</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site: any) => (
                <TableRow key={site.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <TableCell className="font-medium text-slate-900 dark:text-white">{site.name}</TableCell>
                  <TableCell>
                    <a href={`https://${site.domain}`} target="_blank" className="text-blue-500 hover:underline flex items-center gap-1 text-sm">
                      {site.domain} <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Running</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {formatDate(new Date().toISOString())}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
