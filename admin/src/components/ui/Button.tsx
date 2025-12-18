import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        {
          'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20': variant === 'default',
          'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20': variant === 'destructive',
          'border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-[#1e293b] text-slate-700 dark:text-slate-300': variant === 'outline',
          'hover:bg-slate-100 dark:hover:bg-[#1e293b] text-slate-700 dark:text-slate-300': variant === 'ghost',
          'bg-slate-100 dark:bg-[#1e293b] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#334155]': variant === 'secondary',
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
          'h-9 w-9 p-0': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
