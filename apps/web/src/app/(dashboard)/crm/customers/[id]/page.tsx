'use client';

import { useGetCustomer } from '@/features/crm/customer-management/api/customer.hooks';
import { ContactTable } from '@/features/crm/contact-management/components/ContactTable';
import { ContactForm } from '@/features/crm/contact-management/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Building2, MapPin, Globe, Phone, Mail, Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function CustomerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  const [isContactSheetOpen, setContactSheetOpen] = useState(false);
  
  const { data: customer, isLoading, isError } = useGetCustomer(customerId);

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></div>;
  if (isError || !customer) return <div className="text-red-500">Failed to load customer details.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {customer.name}
            </h1>
          </div>
          <p className="text-sm text-gray-500 flex items-center mt-1 space-x-4">
            {customer.industry && <span className="flex items-center"><Building2 className="w-4 h-4 mr-1" /> {customer.industry}</span>}
            {customer.website && <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> <a href={customer.website} target="_blank" rel="noreferrer" className="hover:underline">{customer.website}</a></span>}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-medium border-b pb-2 mb-4">Contact Information</h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500 flex items-center"><Mail className="w-4 h-4 mr-2" /> Email</dt>
                  <dd className="font-medium mt-1">{customer.email || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 flex items-center"><Phone className="w-4 h-4 mr-2" /> Phone</dt>
                  <dd className="font-medium mt-1">{customer.phone || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Billing Address</dt>
                  <dd className="font-medium mt-1">{customer.billingAddress || 'N/A'}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-medium border-b pb-2 mb-4">Account Details</h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500">Created At</dt>
                  <dd className="font-medium mt-1">{new Date(customer.createdAt).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Last Updated</dt>
                  <dd className="font-medium mt-1">{new Date(customer.updatedAt).toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Sheet open={isContactSheetOpen} onOpenChange={setContactSheetOpen}>
                <SheetTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Contact
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Add Contact to {customer.name}</SheetTitle>
                    <SheetDescription>
                      Create a new contact associated directly with this organization.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <ContactForm 
                      customerId={customer.id} 
                      onSuccess={() => setContactSheetOpen(false)} 
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <ContactTable customerId={customer.id} />
          </div>
        </TabsContent>

        <TabsContent value="opportunities">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Pipeline and Opportunities module will be rendered here.
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Associated Projects will be rendered here.
          </div>
        </TabsContent>
        
        <TabsContent value="timeline">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Customer interaction timeline and audit history will be rendered here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
