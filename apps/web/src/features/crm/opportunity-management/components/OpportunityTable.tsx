/* eslint-disable */
'use client';

import { useGetOpportunities } from '../api/opportunity.hooks';
import { Opportunity } from '../schemas/opportunity.schema';
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

export function OpportunityTable() {
  const { data: opportunities, isLoading, isError } = useGetOpportunities();
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
    return <div className="text-red-500">Failed to load opportunities</div>;
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-900 dark:border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Opportunity Name</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Close Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No opportunities found.
              </TableCell>
            </TableRow>
          ) : (
            opportunities?.map((opp) => (
              <TableRow 
                key={opp.id} 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => router.push(`/dashboard/crm/opportunities/${opp.id}`)}
              >
                <TableCell className="font-medium">{opp.name}</TableCell>
                <TableCell>{opp.customer?.name || '-'}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(opp.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{opp.stage}</Badge>
                </TableCell>
                <TableCell>{opp.probability}%</TableCell>
                <TableCell>
                  {opp.expectedClose ? new Date(opp.expectedClose).toLocaleDateString() : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
