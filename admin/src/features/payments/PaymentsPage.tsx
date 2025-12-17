import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { paymentsApi } from '@/services/adminApi';
import { Payment, PagedResponse } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatCurrency } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock data for preview
const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: 'order-1',
    amount: 500000,
    currency: 'VND',
    status: 'success',
    provider: 'VNPay',
    providerReference: 'VNPAY123456',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    orderId: 'order-2',
    amount: 1200000,
    currency: 'VND',
    status: 'failed',
    provider: 'Stripe',
    errorCode: 'CARD_DECLINED',
    errorMessage: 'Card was declined',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    orderId: 'order-3',
    amount: 800000,
    currency: 'VND',
    status: 'pending',
    provider: 'PayPal',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    orderId: 'order-4',
    amount: 2000000,
    currency: 'VND',
    status: 'success',
    provider: 'VNPay',
    providerReference: 'VNPAY789012',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '5',
    orderId: 'order-5',
    amount: 1500000,
    currency: 'VND',
    status: 'failed',
    provider: 'Stripe',
    errorCode: 'INSUFFICIENT_FUNDS',
    errorMessage: 'Insufficient funds',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Use mock data for preview
  const { data, isLoading } = useQuery<PagedResponse<Payment>>({
    queryKey: ['payments', page, search, statusFilter],
    queryFn: async () => {
      // Try real API first, fallback to mock
      try {
        return await paymentsApi.list({
          page,
          pageSize,
          status: statusFilter || undefined,
        });
      } catch {
        // Return mock data
        let filtered = [...mockPayments];
        if (statusFilter) {
          filtered = filtered.filter((p) => p.status.toLowerCase() === statusFilter.toLowerCase());
        }
        if (search) {
          filtered = filtered.filter(
            (p) =>
              p.id.includes(search) ||
              p.orderId.includes(search) ||
              p.providerReference?.includes(search)
          );
        }
        return {
          items: filtered,
          page,
          pageSize,
          total: filtered.length,
        };
      }
    },
  });

  return (
    <>
      <SEO title="Payments" />
      <PageHeader title="Payments" description="View payment transactions and logs" />

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search payments..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="flex h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="No payments found" />
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">{payment.id.slice(0, 8)}...</TableCell>
                    <TableCell className="font-mono text-sm">{payment.orderId.slice(0, 8)}...</TableCell>
                    <TableCell>{formatCurrency(payment.amount, payment.currency)}</TableCell>
                    <TableCell>{payment.provider}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === 'success'
                            ? 'success'
                            : payment.status === 'failed'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {payment.status}
                      </Badge>
                      {payment.errorCode && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {payment.errorCode}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {(data.totalPages || Math.ceil(data.total / pageSize)) > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, data.total)} of{' '}
                {data.total} payments
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= (data.totalPages || Math.ceil(data.total / pageSize))}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedPayment.id}</p>
              <p><strong>Order ID:</strong> {selectedPayment.orderId}</p>
              <p><strong>Amount:</strong> {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
              <p><strong>Provider:</strong> {selectedPayment.provider}</p>
              <p><strong>Status:</strong> {selectedPayment.status}</p>
              {selectedPayment.providerReference && (
                <p><strong>Reference:</strong> {selectedPayment.providerReference}</p>
              )}
              {selectedPayment.errorCode && (
                <>
                  <p><strong>Error Code:</strong> {selectedPayment.errorCode}</p>
                  <p><strong>Error Message:</strong> {selectedPayment.errorMessage}</p>
                </>
              )}
              <p><strong>Created:</strong> {formatDate(selectedPayment.createdAt)}</p>
            </div>
            <Button className="mt-4" onClick={() => setSelectedPayment(null)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}

