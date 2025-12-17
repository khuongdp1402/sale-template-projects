import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { ordersApi } from '@/services/adminApi';
import { Order, PagedResponse } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatCurrency } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye } from 'lucide-react';

// Mock data for preview
const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    userEmail: 'customer1@example.com',
    items: [
      { templateId: 't1', templateName: 'E-commerce Template', price: 500000, quantity: 1 },
    ],
    total: 500000,
    currency: 'VND',
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'order-2',
    userId: 'user-2',
    userEmail: 'customer2@example.com',
    items: [
      { templateId: 't2', templateName: 'Service Template', price: 1200000, quantity: 1 },
    ],
    total: 1200000,
    currency: 'VND',
    status: 'Processing',
    paymentStatus: 'Paid',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'order-3',
    userId: 'user-3',
    userEmail: 'customer3@example.com',
    items: [
      { templateId: 't3', templateName: 'Landing Template', price: 800000, quantity: 1 },
    ],
    total: 800000,
    currency: 'VND',
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'order-4',
    userId: 'user-4',
    userEmail: 'customer4@example.com',
    items: [
      { templateId: 't4', templateName: 'E-commerce Pro', price: 2000000, quantity: 1 },
    ],
    total: 2000000,
    currency: 'VND',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery<PagedResponse<Order>>({
    queryKey: ['orders', page, search, statusFilter],
    queryFn: async () => {
      try {
        return await ordersApi.list({
          page,
          pageSize,
          status: statusFilter || undefined,
          search: search || undefined,
        });
      } catch {
        // Return mock data
        let filtered = [...mockOrders];
        if (statusFilter) {
          filtered = filtered.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
        }
        if (search) {
          filtered = filtered.filter(
            (o) => o.id.includes(search) || o.userEmail.includes(search)
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
      <SEO title="Orders" />
      <PageHeader title="Orders" description="View and manage customer orders" />

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search orders..."
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
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="No orders found" />
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>{order.userEmail}</TableCell>
                    <TableCell>{order.items.length} item(s)</TableCell>
                    <TableCell>{formatCurrency(order.total, order.currency)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'Completed'
                            ? 'success'
                            : order.status === 'Cancelled' || order.status === 'Refunded'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.paymentStatus === 'Paid'
                            ? 'success'
                            : order.paymentStatus === 'Failed'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
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
                {data.total} orders
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Order ID</p>
                <p className="font-mono">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Customer</p>
                <p>{selectedOrder.userEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-100 dark:bg-slate-700 rounded">
                      <p className="font-medium">{item.templateName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {formatCurrency(item.price, selectedOrder.currency)} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-lg font-bold">{formatCurrency(selectedOrder.total, selectedOrder.currency)}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</p>
                  <Badge
                    variant={
                      selectedOrder.status === 'Completed'
                        ? 'success'
                        : selectedOrder.status === 'Cancelled' || selectedOrder.status === 'Refunded'
                        ? 'error'
                        : 'warning'
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Payment</p>
                  <Badge
                    variant={
                      selectedOrder.paymentStatus === 'Paid'
                        ? 'success'
                        : selectedOrder.paymentStatus === 'Failed'
                        ? 'error'
                        : 'warning'
                    }
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="mt-4" onClick={() => setSelectedOrder(null)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}

