'use client';

import { useAuthStore } from '@/store/auth.store';

export default function DashboardPage() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {String(user?.firstName || 'User')}!
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {['Total Revenue', 'Active Users', 'New Leads', 'Open Projects'].map((stat) => (
          <div key={stat} className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat}</dt>
            <dd className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">---</dd>
          </div>
        ))}
      </div>
    </div>
  );
}
