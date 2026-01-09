import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary' | 'destructive';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200': variant === 'default',
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant === 'success',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': variant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant === 'error' || variant === 'destructive',
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': variant === 'info',
          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

