import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { usePaymentsQuery } from '@/hooks/adminHooks';
// import { Payment } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatCurrency } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye, Filter, CreditCard, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/Card';
// import { cn } from '@/lib/utils';

export function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = usePaymentsQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: { status: statusFilter || undefined },
  });

  return (
    <div className="space-y-6">
      <SEO title="Payments" />
      <PageHeader 
        title="Payments" 
        description="Track all financial transactions and payment gateway logs"
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by transaction ID or reference..."
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
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
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
          title="No payments found" 
          description="Payment logs will appear here after orders are placed."
          icon={<CreditCard className="h-12 w-12 text-slate-300" />}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {payment.status === 'success' ? (
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <ShieldAlert className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-mono text-xs font-medium">#{payment.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-500 font-mono">#{payment.orderId.slice(0, 8).toUpperCase()}</span>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none font-medium">
                        {payment.provider}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={payment.status === 'success' ? 'success' : payment.status === 'failed' ? 'destructive' : 'default'}
                        className="capitalize"
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <ExternalLink className="h-4 w-4" />
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
              Page {page} of {data.totalPages || 1}
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
