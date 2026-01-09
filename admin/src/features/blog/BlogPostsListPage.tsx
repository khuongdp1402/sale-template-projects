import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { blogPostsApi } from '@/services/blogApi';
import { formatDate } from '@/lib/format';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { BlogPostDrawer } from './BlogPostDrawer';
import { Badge } from '@/components/ui/Badge';

export function BlogPostsListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Draft' | 'Published' | ''>('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['blogPosts', page, search, statusFilter],
    queryFn: () => blogPostsApi.list({
      page,
      pageSize,
      search: search || undefined,
      status: statusFilter || undefined,
    }),
  });

  const deleteMutation = useMutation({
    mutationFn: blogPostsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });

  const handleCreate = () => {
    setEditingPostId(null);
    setDrawerOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingPostId(id);
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditingPostId(null);
  };

  return (
    <>
      <SEO title="Blog Posts" />
      <PageHeader
        title="Blog Posts"
        actions={
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        }
      />

      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by title..."
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
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </Card>

      <Card>
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : data?.items.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No posts found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {data?.items.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{post.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                        {post.shortDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={post.status === 'Published' ? 'success' : 'default'}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(post.modifiedAt || post.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data && data.totalPages && data.totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, data.total)} of {data.total} posts
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(data.totalPages || 1, p + 1))}
                disabled={page >= (data.totalPages || 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      <BlogPostDrawer
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        postId={editingPostId}
      />
    </>
  );
}

