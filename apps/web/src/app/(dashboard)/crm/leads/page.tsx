'use client';

import { useState } from 'react';
import { LeadTable } from '@/features/crm/lead-management/components/LeadTable';
import { LeadForm } from '@/features/crm/lead-management/components/LeadForm';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

export default function LeadsPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Leads</h1>
          <p className="text-sm text-gray-500">Manage and track your prospective customers.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Lead
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Create New Lead</SheetTitle>
              <SheetDescription>
                Add a new lead to your pipeline. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <LeadForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <LeadTable />
    </div>
  );
}
