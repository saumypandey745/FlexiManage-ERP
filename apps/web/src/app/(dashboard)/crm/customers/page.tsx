'use client';

import { useState } from 'react';
import { CustomerTable } from '@/features/crm/customer-management/components/CustomerTable';
import { CustomerForm } from '@/features/crm/customer-management/components/CustomerForm';
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

export default function CustomersPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-500">Manage your enterprise customer accounts and organizations.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Customer
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Create New Customer</SheetTitle>
              <SheetDescription>
                Add a new customer account to your CRM.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <CustomerForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <CustomerTable />
    </div>
  );
}
