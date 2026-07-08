import React from 'react';
import { AnnouncementTable } from '@/features/notifications/components/AnnouncementTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AnnouncementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Announcements</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your announcements here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <AnnouncementTable />
    </div>
  );
}
