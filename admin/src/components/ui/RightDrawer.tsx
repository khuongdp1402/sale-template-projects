import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  width?: number | string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function RightDrawer({
  open,
  onClose,
  title,
  subtitle,
  width = 520,
  headerActions,
  footer,
  children,
}: RightDrawerProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Simple body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          'relative h-full bg-white dark:bg-[#020617] border-l border-slate-200 dark:border-slate-800 shadow-xl',
          'w-full sm:w-[420px] md:w-[520px] lg:w-[640px] xl:w-[720px]',
          'animate-in slide-in-from-right'
        )}
        style={{ maxWidth: typeof width === 'number' ? `${width}px` : width }}
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#020617]/80 backdrop-blur">
          <div className="min-w-0">
            {title && (
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {headerActions}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto px-5 py-4 pb-24 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="fixed bottom-0 right-0 left-auto w-full sm:w-[420px] md:w-[520px] lg:w-[640px] xl:w-[720px] px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#020617]/90 backdrop-blur flex justify-end gap-2">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
