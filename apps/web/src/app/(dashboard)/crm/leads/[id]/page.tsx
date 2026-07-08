'use client';

import { useGetLead } from '@/features/crm/lead-management/api/lead.hooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function LeadDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;
  
  const { data: lead, isLoading, isError } = useGetLead(leadId);

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></div>;
  if (isError || !lead) return <div className="text-red-500">Failed to load lead details.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {lead.firstName} {lead.lastName}
            </h1>
            <Badge variant="secondary">{lead.status}</Badge>
          </div>
          <p className="text-sm text-gray-500">{lead.company || 'No Company'} • {lead.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-medium">Activity Timeline</h2>
            <div className="mt-4 text-sm text-gray-500">
              No recent activity found for this lead.
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-medium">Details</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Phone</dt>
                <dd className="font-medium">{lead.phone || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Source</dt>
                <dd className="font-medium">{lead.source || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Created</dt>
                <dd className="font-medium">{new Date(lead.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
