import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { useContactsQuery } from '@/hooks/adminHooks';
import { Contact } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye, Filter, Mail, Phone, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useRightPanel } from '@/app/panel/useRightPanel';

export function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { openPanel } = useRightPanel();

  const { data, isLoading } = useContactsQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: { status: statusFilter || undefined },
  });

  return (
    <div className="space-y-6">
      <SEO title="Contacts" />
      <PageHeader 
        title="Contact Requests" 
        description="Manage customer inquiries and service leads"
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email or message..."
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
              <option value="New">New</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
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
          title="No contacts found" 
          description="Inquiries from the marketing site will appear here."
          icon={<MessageSquare className="h-12 w-12 text-slate-300" />}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Message Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((contact: Contact) => (
                  <TableRow key={contact.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900 dark:text-white leading-none mb-1">{contact.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          {contact.emailOrPhone.includes('@') ? <Mail className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                          {contact.emailOrPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{contact.message}</p>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={contact.status === 'Done' ? 'success' : contact.status === 'InProgress' ? 'warning' : 'info'}
                        className="capitalize"
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        {contact.source || 'WEB'}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm whitespace-nowrap">
                      {formatDate(contact.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                          onClick={() => openPanel({ type: 'contacts', mode: 'detail', id: contact.id })}
                        >
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
              Showing <span className="font-medium text-slate-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(page * pageSize, data.total)}</span> of <span className="font-medium text-slate-900 dark:text-white">{data.total}</span> inquiries
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= (data.totalPages || 1)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
