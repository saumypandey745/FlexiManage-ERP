/* eslint-disable */
'use client';

import { useGetLeads } from '../api/lead.hooks';
import { Lead } from '../schemas/lead.schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export function LeadTable() {
  const { data: leads, isLoading, isError } = useGetLeads();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load leads</div>;
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-900 dark:border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads?.map((lead) => (
              <TableRow 
                key={lead.id} 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => router.push(`/dashboard/crm/leads/${lead.id}`)}
              >
                <TableCell className="font-medium">
                  {lead.firstName} {lead.lastName}
                </TableCell>
                <TableCell>{lead.company || '-'}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Badge variant={lead.status === 'NEW' ? 'default' : 'secondary'}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
