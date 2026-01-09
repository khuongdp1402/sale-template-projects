import { SEO } from '@/lib/seo';
import { PageHeader } from '@/components/common/PageHeader';
import { KPICard } from './KPICard';
import { OrdersChart } from './OrdersChart';
import { PaymentChart } from './PaymentChart';
import { SystemStatus } from './SystemStatus';
import { RecentActivity } from './RecentActivity';
import { Package, ShoppingCart, CreditCard, MessageSquare, TrendingUp, Filter } from 'lucide-react';
import { 
  useTemplatesQuery, useOrdersQuery, 
  usePaymentsQuery, useContactsQuery, useHealthQuery 
} from '@/hooks/adminHooks';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function DashboardPage() {
  const { data: templates } = useTemplatesQuery({ pageSize: 1 });
  const { data: orders } = useOrdersQuery({ pageSize: 1 });
  const { data: payments } = usePaymentsQuery({ pageSize: 1 });
  const { data: contacts } = useContactsQuery({ pageSize: 1 });
  const { data: health } = useHealthQuery();

  const kpis = [
    {
      label: 'Templates',
      value: templates?.total?.toString() || '0',
      icon: Package,
      trend: { value: 12, isPositive: true },
    },
    {
      label: 'Orders',
      value: orders?.total?.toString() || '0',
      icon: ShoppingCart,
      trend: { value: 8, isPositive: true },
    },
    {
      label: 'Payments',
      value: payments?.total?.toString() || '0',
      icon: CreditCard,
      trend: { value: 2, isPositive: false },
    },
    {
      label: 'Inquiries',
      value: contacts?.total?.toString() || '0',
      icon: MessageSquare,
      trend: { value: 5, isPositive: true },
    },
  ];

  return (
    <div className="space-y-6">
      <SEO title="Dashboard" />
      <PageHeader 
        title="Admin Overview" 
        description="Business intelligence and system status dashboard"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Period: Last 30 Days
            </Button>
            <Button variant="default" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Transaction Volume</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Orders
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" /> Previous
              </span>
            </div>
          </div>
          <div className="p-6 h-[300px]">
            <OrdersChart />
          </div>
        </Card>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white">Payment Health</h3>
          </div>
          <div className="p-6 h-[300px]">
            <PaymentChart />
          </div>
        </Card>
      </div>

      {/* System Status & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SystemStatus
            health={health || []}
            monitoring={{
              webhooks: { total: 12, active: 10, failed: 2, items: [] },
              jobs: { total: 5, running: 2, failed: 0, items: [] },
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
