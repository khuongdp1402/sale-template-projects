import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { KPICard } from './KPICard';
import { OrdersChart } from './OrdersChart';
import { PaymentChart } from './PaymentChart';
import { SystemStatus } from './SystemStatus';
import { RecentActivity } from './RecentActivity';
import { Package, ShoppingCart, CreditCard, MessageSquare, AlertCircle } from 'lucide-react';
import { templatesApi, ordersApi, paymentsApi, contactsApi, deploymentsApi, monitoringApi } from '@/services/adminApi';

export function DashboardPage() {
  // KPI: Templates count
  const { data: templatesData } = useQuery({
    queryKey: ['dashboard', 'templates'],
    queryFn: () => templatesApi.list({ page: 1, pageSize: 1 }),
  });

  // KPI: Orders today
  const today = new Date().toISOString().split('T')[0];
  const { data: ordersData } = useQuery({
    queryKey: ['dashboard', 'orders', today],
    queryFn: () => ordersApi.list({ dateFrom: today, page: 1, pageSize: 1 }),
  });

  // KPI: Payment failures last 24h
  const { data: paymentFailures } = useQuery({
    queryKey: ['dashboard', 'payment-failures'],
    queryFn: () => paymentsApi.getFailures(),
  });

  // KPI: New contacts
  const { data: contactsData } = useQuery({
    queryKey: ['dashboard', 'contacts', 'new'],
    queryFn: () => contactsApi.list({ status: 'New', page: 1, pageSize: 5 }),
  });

  // KPI: Deployments failing
  const { data: deploymentsData } = useQuery({
    queryKey: ['dashboard', 'deployments'],
    queryFn: () => deploymentsApi.list(),
  });

  // Health monitoring
  const { data: health } = useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: () => monitoringApi.getHealth(),
    refetchInterval: 30000,
  });

  const { data: webhooks } = useQuery({
    queryKey: ['dashboard', 'webhooks'],
    queryFn: () => monitoringApi.getWebhooks(),
    refetchInterval: 60000,
  });

  const { data: jobs } = useQuery({
    queryKey: ['dashboard', 'jobs'],
    queryFn: () => monitoringApi.getJobs(),
    refetchInterval: 60000,
  });

  const kpis = [
    {
      label: 'Total Templates',
      value: templatesData?.total?.toString() || '0',
      icon: Package,
      trend: undefined,
    },
    {
      label: 'New Orders Today',
      value: ordersData?.total?.toString() || '0',
      icon: ShoppingCart,
      trend: undefined,
    },
    {
      label: 'Payment Failures (24h)',
      value: paymentFailures?.length?.toString() || '0',
      icon: CreditCard,
      trend: undefined,
    },
    {
      label: 'New Contacts',
      value: contactsData?.total?.toString() || '0',
      icon: MessageSquare,
      trend: undefined,
    },
  ];

  const failingDeployments = deploymentsData?.filter((d) => d.status === 'failed').length || 0;

  return (
    <>
      <SEO title="Dashboard" />
      <PageHeader title="Dashboard" description="Overview of your system" />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Orders per Day
            </h3>
            <OrdersChart />
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Payment Success vs Failure
            </h3>
            <PaymentChart />
          </div>
        </Card>
      </div>

      {/* System Status & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemStatus
          health={health || []}
          monitoring={{
            health: health || [],
            webhooks: webhooks || { total: 0, active: 0, failed: 0 },
            jobs: jobs || { total: 0, running: 0, failed: 0 },
          }}
        />
        <RecentActivity />
      </div>
    </>
  );
}

