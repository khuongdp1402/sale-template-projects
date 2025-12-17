import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { contactsApi } from '@/services/adminApi';
import { Contact, PagedResponse } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye } from 'lucide-react';

export function ContactsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const pageSize = 10;

  const { data, isLoading } = useQuery<PagedResponse<Contact>>({
    queryKey: ['contacts', page, search, statusFilter],
    queryFn: () =>
      contactsApi.list({
        page,
        pageSize,
        search: search || undefined,
        status: statusFilter || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      contactsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return (
    <>
      <SEO title="Contacts" />
      <PageHeader title="Contact Requests" description="Manage leads and contact submissions" />

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search contacts..."
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
          <option value="New">New</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="No contact requests found" />
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email/Phone</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.emailOrPhone}</TableCell>
                    <TableCell>{contact.source || '-'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contact.status === 'Done'
                            ? 'success'
                            : contact.status === 'InProgress'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(contact.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {contact.status !== 'Done' && (
                          <select
                            value={contact.status}
                            onChange={(e) =>
                              updateStatusMutation.mutate({ id: contact.id, status: e.target.value })
                            }
                            className="text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1"
                          >
                            <option value="New">New</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Done">Done</option>
                          </select>
                        )}
                      </div>
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
                {data.total} contacts
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

      {/* Contact Detail Modal/Drawer - TODO: Implement */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">{selectedContact.name}</h2>
            <p className="mb-2"><strong>Contact:</strong> {selectedContact.emailOrPhone}</p>
            <p className="mb-2"><strong>Source:</strong> {selectedContact.source || '-'}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedContact.status}</p>
            <p className="mb-4"><strong>Message:</strong></p>
            <p className="mb-4 p-4 bg-slate-100 dark:bg-slate-700 rounded">{selectedContact.message}</p>
            <Button onClick={() => setSelectedContact(null)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}

