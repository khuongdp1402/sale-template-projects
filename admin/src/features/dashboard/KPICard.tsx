import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface KPICardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function KPICard({ label, value, icon: Icon, trend }: KPICardProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
            {trend && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">{trend} from last period</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
            <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
      </div>
    </Card>
  );
}

