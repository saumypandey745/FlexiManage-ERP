'use client';

import { useState } from 'react';
import { ContactTable } from '@/features/crm/contact-management/components/ContactTable';
import { ContactForm } from '@/features/crm/contact-management/components/ContactForm';
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

export default function ContactsPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Contacts</h1>
          <p className="text-sm text-gray-500">Manage all individual contacts across your organization.</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Contact
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Contact</SheetTitle>
              <SheetDescription>
                Add a new contact. You can assign them to a customer later if needed.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <ContactForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ContactTable />
    </div>
  );
}
