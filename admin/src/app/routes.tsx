import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from './layout/AdminLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { TemplatesListPage } from '@/features/templates/TemplatesListPage';
import { TemplateEditPage } from '@/features/templates/TemplateEditPage';
import { BlogListPage } from '@/features/blog/BlogListPage';
import { BlogEditPage } from '@/features/blog/BlogEditPage';
import { LandingSectionsPage } from '@/features/landing/LandingSectionsPage';
import { UsersPage } from '@/features/users/UsersPage';
import { OrdersPage } from '@/features/orders/OrdersPage';
import { PaymentsPage } from '@/features/payments/PaymentsPage';
import { ContactsPage } from '@/features/contacts/ContactsPage';
import { MonitoringPage } from '@/features/monitoring/MonitoringPage';
import { DeployPage } from '@/features/deploy/DeployPage';
import { LogsPage } from '@/features/logs/LogsPage';
import { ProfilePage } from '@/features/auth/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'templates',
        element: <TemplatesListPage />,
      },
      {
        path: 'templates/new',
        element: <TemplateEditPage />,
      },
      {
        path: 'templates/:id/edit',
        element: <TemplateEditPage />,
      },
      {
        path: 'blog',
        element: <BlogListPage />,
      },
      {
        path: 'blog/new',
        element: <BlogEditPage />,
      },
      {
        path: 'blog/:id/edit',
        element: <BlogEditPage />,
      },
      {
        path: 'landing-sections',
        element: <LandingSectionsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'monitoring',
        element: <MonitoringPage />,
      },
      {
        path: 'deploy',
        element: <DeployPage />,
      },
      {
        path: 'logs',
        element: <LogsPage />,
      },
      {
        path: 'settings/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
]);

