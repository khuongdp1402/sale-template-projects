import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { useBlogPostsQuery } from '@/hooks/adminHooks';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate } from '@/lib/format';
import { Plus, Search, Edit, Trash2, Filter, MessageSquare, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useRightPanel } from '@/app/panel/useRightPanel';
import { BlogPost } from '@/types/api';

export function BlogListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 10;
  const { openPanel } = useRightPanel();

  const { data, isLoading } = useBlogPostsQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: { status: statusFilter || undefined },
  });

  return (
    <div className="space-y-6">
      <SEO title="Blog" />
      <PageHeader
        title="Blog Posts"
        subtitle="Manage articles, updates and ecosystem guides"
        actions={
          <Button onClick={() => openPanel({ type: 'blog', mode: 'create' })} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        }
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search posts by title or category..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
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
            <div key={i} className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          title="No blog posts found"
          description="Try creating your first blog post to engage with users."
          action={
            <Button onClick={() => openPanel({ type: 'blog', mode: 'create' })}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead className="w-[450px]">Post Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((post: BlogPost) => (
                  <TableRow key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white truncate mb-1">{post.title}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{formatDate(post.createdAt)}</span>
                            <span>•</span>
                            <span className="truncate">/{post.slug}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-none font-medium">
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={post.status === 'published' ? 'success' : 'default'}
                        className={cn(
                          'flex w-fit items-center gap-1.5',
                          post.status === 'published'
                            ? ''
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none'
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            post.status === 'published' ? 'bg-green-500' : 'bg-slate-400'
                          )}
                        />
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="flex items-center gap-1 text-sm">
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>0</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                          onClick={() => openPanel({ type: 'blog', mode: 'edit', id: post.id })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <BarChart2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600"
                          onClick={() => setDeleteId(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
              Showing <span className="font-medium text-slate-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(page * pageSize, data.total)}</span> of <span className="font-medium text-slate-900 dark:text-white">{data.total}</span> posts
            </p>
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
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        variant="destructive"
      />
    </div>
  );
}
