'use client';

import { useSidebarStore } from '@/store/sidebar.store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm', label: 'CRM', icon: Users },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebarStore();
  const pathname = usePathname();
  const logout = useAuthStore(state => state.logout);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
        {!isCollapsed && <span className="text-lg font-bold">FlexiManage</span>}
        <button onClick={toggle} className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon size={20} className={cn(!isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="border-t p-2 dark:border-gray-800">
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} className={cn(!isCollapsed && "mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
