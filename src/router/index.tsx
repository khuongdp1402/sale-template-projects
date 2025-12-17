import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { TemplatesPage } from '../pages/TemplatesPage';
import { TemplateDetailPage } from '../pages/TemplateDetailPage';
import { BlogPage } from '../pages/BlogPage';
import { BlogDetailPage } from '../pages/BlogDetailPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardHome } from '../pages/dashboard/DashboardHome';
import { PurchasesPage } from '../pages/dashboard/PurchasesPage';
import { ApiAccessPage } from '../pages/dashboard/ApiAccessPage';
import { AccountSettingsPage } from '../pages/dashboard/AccountSettingsPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { RequireAuth } from '../components/auth/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'templates',
        element: <TemplatesPage />,
      },
      {
        path: 'templates/:id',
        element: <TemplateDetailPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'blog/:slug',
        element: <BlogDetailPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
  {
    path: '/admin/users',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
    ],
  },
  {
    path: '/admin/purchases',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <PurchasesPage />,
      },
    ],
  },
  {
    path: '/admin/api',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <ApiAccessPage />,
      },
    ],
  },
  {
    path: '/admin/account',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <AccountSettingsPage />,
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
