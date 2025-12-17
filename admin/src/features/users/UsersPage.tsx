import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SEO } from '@/lib/seo';
import { usersApi } from '@/services/adminApi';
import { User, PagedResponse, Role } from '@/types/api';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import { EmptyState } from '@/components/common/EmptyState';
import { Search, Eye } from 'lucide-react';

// Mock data for preview
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@kwingx.com',
    phone: '+84 123 456 789',
    roles: ['SuperAdmin'],
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '2',
    username: 'editor1',
    email: 'editor@kwingx.com',
    phone: '+84 987 654 321',
    roles: ['Editor'],
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: '3',
    username: 'support1',
    email: 'support@kwingx.com',
    roles: ['Support'],
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: '4',
    username: 'finance1',
    email: 'finance@kwingx.com',
    roles: ['Finance'],
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '5',
    username: 'user1',
    email: 'user1@example.com',
    roles: [],
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery<PagedResponse<User>>({
    queryKey: ['users', page, search, roleFilter, statusFilter],
    queryFn: async () => {
      try {
        return await usersApi.list({
          page,
          pageSize,
          search: search || undefined,
          role: roleFilter || undefined,
          status: statusFilter || undefined,
        });
      } catch {
        // Return mock data
        let filtered = [...mockUsers];
        if (search) {
          filtered = filtered.filter(
            (u) => u.username.includes(search) || u.email.includes(search)
          );
        }
        if (roleFilter) {
          filtered = filtered.filter((u) => u.roles.includes(roleFilter as Role));
        }
        if (statusFilter) {
          filtered = filtered.filter((u) => u.status === statusFilter.toLowerCase());
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
      <SEO title="Users" />
      <PageHeader title="Users" description="Manage user accounts and roles" />

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="flex h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
        >
          <option value="">All Roles</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Support">Support</option>
          <option value="Finance">Finance</option>
          <option value="Ops">Ops</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="flex h-10 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="No users found" />
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <Badge key={role} variant="info">
                              {role}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">No roles</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
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
                {data.total} users
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Username</p>
                <p>{selectedUser.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              {selectedUser.phone && (
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Roles</p>
                <div className="flex gap-2 mt-1">
                  {selectedUser.roles.length > 0 ? (
                    selectedUser.roles.map((role) => (
                      <Badge key={role} variant="info">
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No roles assigned</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</p>
                <Badge variant={selectedUser.status === 'active' ? 'success' : 'default'}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Created</p>
                <p>{formatDate(selectedUser.createdAt)}</p>
              </div>
            </div>
            <Button className="mt-4" onClick={() => setSelectedUser(null)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}

