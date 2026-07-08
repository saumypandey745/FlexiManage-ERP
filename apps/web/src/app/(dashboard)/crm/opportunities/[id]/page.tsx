'use client';

import { useGetOpportunity } from '@/features/crm/opportunity-management/api/opportunity.hooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Target, DollarSign, Calendar, Percent } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function OpportunityDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const opportunityId = params.id as string;
  
  const { data: opportunity, isLoading, isError } = useGetOpportunity(opportunityId);

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></div>;
  if (isError || !opportunity) return <div className="text-red-500">Failed to load opportunity details.</div>;

  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(opportunity.amount);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {opportunity.name}
            </h1>
            <Badge variant="outline">{opportunity.stage.replace(/_/g, ' ')}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Associated with Customer: {opportunity.customer?.name || 'Unknown'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex items-center space-x-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-full dark:bg-green-900/50"><DollarSign className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-semibold">{formattedAmount}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/50"><Percent className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-gray-500">Probability</p>
            <p className="font-semibold">{opportunity.probability}%</p>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex items-center space-x-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900/50"><Target className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-gray-500">Weighted Value</p>
            <p className="font-semibold">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((opportunity.amount * opportunity.probability) / 100)}
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex items-center space-x-3">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-full dark:bg-orange-900/50"><Calendar className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-gray-500">Expected Close</p>
            <p className="font-semibold">{opportunity.expectedClose ? new Date(opportunity.expectedClose).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="history">Stage History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-medium border-b pb-2 mb-4">Opportunity Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm">
              <div>
                <dt className="text-gray-500">Stage</dt>
                <dd className="font-medium mt-1">{opportunity.stage.replace(/_/g, ' ')}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Created At</dt>
                <dd className="font-medium mt-1">{new Date(opportunity.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Last Updated</dt>
                <dd className="font-medium mt-1">{new Date(opportunity.updatedAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Owner ID</dt>
                <dd className="font-medium mt-1">{opportunity.assignedToId || 'Unassigned'}</dd>
              </div>
            </dl>
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Activity stream and timeline will be rendered here.
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Opportunity stage transition history will be rendered here.
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500 dark:bg-gray-900 dark:border-gray-800">
            Associated contracts and documents will be rendered here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
