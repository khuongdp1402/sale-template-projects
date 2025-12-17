import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './router';
import { ThemeProvider } from './theme/ThemeContext';
import { I18nProvider } from './i18n/I18nContext';
import { ToastProvider } from './components/auth/Toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
