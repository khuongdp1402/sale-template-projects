import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { TemplatesPage } from '../pages/TemplatesPage';
import { TemplateDetailPage } from '../pages/TemplateDetailPage';
import { BlogPage } from '../pages/BlogPage';
import { BlogDetailPage } from '../pages/BlogDetailPage';
import { ContactPage } from '../pages/ContactPage';

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
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
