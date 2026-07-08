import React from 'react';
import { StockMovementTable } from '@/features/inventory/components/StockMovementTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function StockMovementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">StockMovements</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your stockmovements here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <StockMovementTable />
    </div>
  );
}
