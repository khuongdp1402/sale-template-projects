import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { RightPanelProvider } from '@/app/panel/RightPanelProvider';

export function AdminLayout() {
  return (
    <RightPanelProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220]">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </RightPanelProvider>
  );
}
