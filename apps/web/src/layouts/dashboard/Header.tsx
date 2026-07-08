/* eslint-disable */
'use client';

import { useAuthStore } from '@/store/auth.store';
import { Bell, Search } from 'lucide-react';

export function Header() {
  const user = useAuthStore(state => state.user);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:ring-gray-700 sm:text-sm sm:leading-6"
            placeholder="Search enterprise..."
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col items-end text-sm">
            <span className="font-semibold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-gray-500 dark:text-gray-400">{user?.roles?.[0] || 'User'}</span>
          </div>
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
            alt="Avatar"
          />
        </div>
      </div>
    </header>
  );
}
