import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  try {
    return format(new Date(date), formatStr);
  } catch {
    return String(date);
  }
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
}

export function formatRelativeTime(date: string | Date): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return String(date);
  }
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  // Handle VND separately as it doesn't have decimal places
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

