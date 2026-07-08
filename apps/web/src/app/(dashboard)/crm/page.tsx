/* eslint-disable */
'use client';

import { useDashboardStore } from '@/features/crm/dashboard/store/dashboard.store';
import { useRealTimeCRM } from '@/features/crm/dashboard/hooks/useRealTimeCRM';
import { StatCard } from '@/features/crm/dashboard/components/widgets/StatCard';
import { RevenueTrendChart } from '@/features/crm/dashboard/components/charts/RevenueTrendChart';
import { PipelineFunnelChart } from '@/features/crm/dashboard/components/charts/PipelineFunnelChart';
import { StageDistributionChart } from '@/features/crm/dashboard/components/charts/StageDistributionChart';
import { WinLossChart } from '@/features/crm/dashboard/components/charts/WinLossChart';
import { useGetOpportunities } from '@/features/crm/opportunity-management/api/opportunity.hooks';
import { useGetLeads } from '@/features/crm/lead-management/api/lead.hooks';
import { useGetCustomers } from '@/features/crm/customer-management/api/customer.hooks';
import { AiAssistantDrawer } from '@/features/crm/ai/components/AiAssistantDrawer';
import { GlobalSearchModal } from '@/components/shared/GlobalSearchModal';
import { Button } from '@/components/ui/button';
import { DollarSign, Target,   Search, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function CRMDashboard() {
  // Initialize Real-time CRM WebSocket connection
  const { isConnected } = useRealTimeCRM();
  
  // Data Fetching
  const { data: opportunities, isLoading: oppsLoading } = useGetOpportunities();
  const { data: leads, isLoading: leadsLoading } = useGetLeads();
  const { data: customers, isLoading: custsLoading } = useGetCustomers();

  // Calculate Metrics
  const totalRevenue = opportunities?.reduce((sum, opp) => sum + Number(opp.amount), 0) || 0;
  const wonRevenue = opportunities?.filter(o => o.stage === 'CLOSED_WON').reduce((sum, opp) => sum + Number(opp.amount), 0) || 0;
  const openDeals = opportunities?.filter(o => o.stage !== 'CLOSED_WON' && o.stage !== 'CLOSED_LOST').length || 0;
  const newLeads = leads?.filter(l => l.status === 'NEW').length || 0;
  const totalCustomers = customers?.length || 0;

  // Formatters
  const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  if (oppsLoading || leadsLoading || custsLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Dashboard Data...</div>;
  }

  return (
    <div className="space-y-6">
      <GlobalSearchModal />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            CRM Executive Dashboard
            {isConnected ? (
              <span className="ml-3 flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"><div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div> Live</span>
            ) : (
              <span className="ml-3 flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full"><div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div> Connecting...</span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of your sales pipeline and customer interactions. Press <kbd className="px-1 border rounded bg-gray-50">CTRL</kbd> + <kbd className="px-1 border rounded bg-gray-50">K</kbd> to search.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}>
            <Search className="w-4 h-4 mr-2" /> Global Search
          </Button>
          <AiAssistantDrawer />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Pipeline Value" 
          value={formatMoney(totalRevenue)} 
          icon={<DollarSign className="h-5 w-5" />} 
          trend={{ value: 12.5, isPositive: true }}
          description="Total value of all opportunities"
        />
        <StatCard 
          title="Closed Won Revenue" 
          value={formatMoney(wonRevenue)} 
          icon={<Target className="h-5 w-5" />} 
          trend={{ value: 4.1, isPositive: true }}
        />
        <StatCard 
          title="Open Deals" 
          value={openDeals} 
          icon={<RefreshCw className="h-5 w-5" />} 
        />
        <StatCard 
          title="Total Customers" 
          value={totalCustomers} 
          icon={<Building2 className="h-5 w-5" />} 
          description={`${newLeads} new leads waiting`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueTrendChart opportunities={opportunities || []} />
        <PipelineFunnelChart opportunities={opportunities || []} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StageDistributionChart opportunities={opportunities || []} />
        <WinLossChart opportunities={opportunities || []} />
      </div>
    </div>
  );
}

// Ensure Building2 is imported
import { Building2 } from 'lucide-react';
