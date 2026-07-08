'use client';

import { PipelineBoard } from '@/features/crm/opportunity-management/components/PipelineBoard';
import { OpportunityForm } from '@/features/crm/opportunity-management/components/OpportunityForm';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PipelinePage() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pipeline Kanban</h1>
          <p className="text-sm text-gray-500">Drag and drop opportunities to update stages.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/crm/opportunities')}>
            <List className="mr-2 h-4 w-4" /> List View
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Opportunity
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create New Opportunity</SheetTitle>
                <SheetDescription>
                  Add a new deal directly to the pipeline.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <OpportunityForm onSuccess={() => setSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <PipelineBoard />
    </div>
  );
}
