'use client';

import { useState } from 'react';
import { OpportunityTable } from '@/features/crm/opportunity-management/components/OpportunityTable';
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
import { Plus, Columns } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OpportunitiesPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Opportunities</h1>
          <p className="text-sm text-gray-500">Manage all prospective sales and deals.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/crm/pipeline')}>
            <Columns className="mr-2 h-4 w-4" /> View Pipeline
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
                  Add a new deal to your pipeline.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <OpportunityForm onSuccess={() => setSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <OpportunityTable />
    </div>
  );
}
