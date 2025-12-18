import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function KPICard({ label, value, icon: Icon, trend }: KPICardProps) {
  return (
    <Card className="hover:border-blue-500/30 transition-colors duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold",
              trend.isPositive 
                ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}>
              {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trend.value}%
            </div>
            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
}
