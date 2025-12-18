import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { useTemplatesQuery } from '@/hooks/adminHooks';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate, formatCurrency } from '@/lib/format';
import { Plus, Search, Edit, Trash2, Filter, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useRightPanel } from '@/app/panel/useRightPanel';
import { Template } from '@/types/api';

export function TemplatesListPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const pageSize = 10;
  const { openPanel } = useRightPanel();

  const { data, isLoading } = useTemplatesQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: {
      category: categoryFilter || undefined,
      type: typeFilter || undefined,
      status: statusFilter || undefined,
    },
  });

  return (
    <div className="space-y-6">
      <SEO title="Templates" />
      <PageHeader
        title="Templates"
        subtitle="Manage your ecosystem templates, themes and starters"
        actions={
          <Button onClick={() => openPanel({ type: 'templates', mode: 'create' })} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        }
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search templates by name or slug..."
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] px-3 py-2 text-sm outline-none"
            >
              <option value="">All Types</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Landing">Landing</option>
              <option value="Service">Service</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] px-3 py-2 text-sm outline-none"
            >
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          title="No templates found"
          description="You haven't created any templates yet or no results match your filters."
          action={
            <Button onClick={() => openPanel({ type: 'templates', mode: 'create' })}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Template
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead className="w-[400px]">Template</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((template: Template) => (
                  <TableRow key={template.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          {template.media?.[0] ? (
                            <img src={template.media[0].src} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              {/* icon placeholder */}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">{template.name}</p>
                          <p className="text-xs text-slate-500 truncate">/{template.slug}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                        {template.templateType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      {formatCurrency(template.price, template.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={template.status === 'Published' ? 'success' : 'default'}
                        className={cn(
                          'flex w-fit items-center gap-1.5',
                          template.status === 'Published'
                            ? ''
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-none'
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            template.status === 'Published' ? 'bg-green-500' : 'bg-amber-500'
                          )}
                        />
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {formatDate(template.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                          onClick={() => openPanel({ type: 'templates', mode: 'edit', id: template.id })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600"
                          onClick={() => setDeleteId(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

          <div className="flex items-center justify-between px-2 py-2">
            <p className="text-sm text-slate-500">Page {page} of {data.totalPages || 1}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
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

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {}}
        title="Delete Template"
        message="Are you sure you want to delete this template? This will hide it from the portal."
        variant="destructive"
      />
    </div>
  );
}
