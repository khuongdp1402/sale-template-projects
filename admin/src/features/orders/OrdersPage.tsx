import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { useOrdersQuery } from '@/hooks/adminHooks';
import { Order, OrderStatus } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatCurrency } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye, Filter, Download, MoreHorizontal, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useOrdersQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: { status: statusFilter || undefined },
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'pending': return 'warning';
      case 'cancelled':
      case 'refunded': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <SEO title="Orders" />
      <PageHeader 
        title="Orders" 
        subtitle="Manage customer purchases and transactions"
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        }
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by order ID or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-700"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] px-3 py-2 text-sm outline-none"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState 
          title="No orders found" 
          description="Orders will appear here once customers start purchasing."
          icon={<ShoppingBag className="h-12 w-12 text-slate-300" />}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-slate-900 dark:text-white leading-none mb-1">{order.userEmail.split('@')[0]}</p>
                        <p className="text-xs text-slate-500">{order.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(order.total, order.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status)} className="capitalize">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={order.paymentStatus === 'paid' ? 'success' : 'default'}
                        className={cn(
                          "flex w-fit items-center gap-1.5",
                          order.paymentStatus === 'paid' ? "" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none"
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", order.paymentStatus === 'paid' ? "bg-green-500" : "bg-slate-400")} />
                        {order.paymentStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900 dark:text-white">{((page - 1) * pageSize) + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(page * pageSize, data.total)}</span> of <span className="font-medium text-slate-900 dark:text-white">{data.total}</span> orders
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= (data.totalPages || 1)} onClick={() => setPage(page + 1)}>Next</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
