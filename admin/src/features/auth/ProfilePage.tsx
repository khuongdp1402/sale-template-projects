import { SEO } from '@/lib/seo';
import { useAuth } from './authContext';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/format';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO title="Profile" />
      <PageHeader title="My Profile" description="View and manage your account" />

      <Card>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Username
            </label>
            <p className="text-slate-900 dark:text-white">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <p className="text-slate-900 dark:text-white">{user.email}</p>
          </div>
          {/* Phone field not available in UserDto */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Roles
            </label>
            <div className="flex gap-2 mt-1">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <p className="text-slate-900 dark:text-white capitalize">{user.isActive ? 'Active' : 'Inactive'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Created At
            </label>
            <p className="text-slate-900 dark:text-white">{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </Card>
    </>
  );
}

