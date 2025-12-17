import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Providers } from './providers/Providers';

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

