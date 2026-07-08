/* eslint-disable */
'use client';

import { useGetContacts } from '../api/contact.hooks';
import { Contact } from '../schemas/contact.schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export function ContactTable({ customerId }: { customerId?: string }) {
  const { data: contacts, isLoading, isError } = useGetContacts(customerId);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load contacts</div>;
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-900 dark:border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Primary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No contacts found.
              </TableCell>
            </TableRow>
          ) : (
            contacts?.map((contact) => (
              <TableRow 
                key={contact.id} 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => router.push(`/dashboard/crm/contacts/${contact.id}`)}
              >
                <TableCell className="font-medium">
                  {contact.firstName} {contact.lastName}
                </TableCell>
                <TableCell>{contact.jobTitle || '-'}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone || '-'}</TableCell>
                <TableCell>
                  {contact.isPrimary && <Badge variant="default">Primary</Badge>}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
