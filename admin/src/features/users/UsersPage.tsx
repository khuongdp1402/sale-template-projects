import { useState } from 'react';
import { SEO } from '@/lib/seo';
import { useUsersQuery } from '@/hooks/useUsers';
import { User } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye, UserPlus, Filter, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useRightPanel } from '@/app/panel/useRightPanel';

export function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { openPanel } = useRightPanel();

  const { data, isLoading } = useUsersQuery({
    page,
    pageSize,
    search: search || undefined,
    filters: roleFilter ? { role: roleFilter } : undefined,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <SEO title="Users" />
      <PageHeader 
        title="Users" 
        subtitle="Manage user accounts, roles and permissions"
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={() => openPanel({ type: 'users', mode: 'create' })}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        }
      />

      <Card className="p-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email..."
              value={search}
              onChange={handleSearch}
              className="pl-10 bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-700"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Roles</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Support">Support</option>
            </select>
            <Button variant="outline" size="icon" className="hidden md:flex">
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
        <EmptyState title="No users found" description="Try adjusting your search or filters." />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-[#1e293b]/50">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((user: User) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white leading-none mb-1">{user.username}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5 flex-wrap">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-none font-medium">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'success' : 'default'} className="flex w-fit items-center gap-1.5">
                        <span className={cn('w-1.5 h-1.5 rounded-full', user.isActive ? 'bg-green-500' : 'bg-slate-400')} />
                        {user.isActive ? 'Active' : 'Disabled'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                          onClick={() => openPanel({ type: 'users', mode: 'detail', id: user.id })}
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <p className="text-sm text-slate-500 dark:text-slate-400 order-2 sm:order-1">
              Showing <span className="font-medium text-slate-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(page * pageSize, data.total)}</span> of <span className="font-medium text-slate-900 dark:text-white">{data.total}</span> users
            </p>
            <div className="flex gap-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded-lg px-4"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1 px-2">
                {[...Array(data.totalPages || 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= (data.totalPages || 1)}
                onClick={() => setPage(page + 1)}
                className="rounded-lg px-4"
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
