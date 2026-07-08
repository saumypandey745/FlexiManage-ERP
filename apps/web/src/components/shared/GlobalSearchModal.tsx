'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  
  
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Building2, User, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetCustomers } from '@/features/crm/customer-management/api/customer.hooks';
import { useGetLeads } from '@/features/crm/lead-management/api/lead.hooks';
import { useGetOpportunities } from '@/features/crm/opportunity-management/api/opportunity.hooks';

export function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const { data: customers } = useGetCustomers();
  const { data: leads } = useGetLeads();
  const { data: opportunities } = useGetOpportunities();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const getResults = () => {
    if (!query) return [];
    
    const searchLower = query.toLowerCase();
    const results = [];

    if (customers) {
      results.push(
        ...customers
          .filter(c => c.name.toLowerCase().includes(searchLower))
          .map(c => ({ id: c.id, type: 'Customer', name: c.name, icon: <Building2 className="h-4 w-4 text-blue-500" />, path: `/dashboard/crm/customers/${c.id}` }))
      );
    }
    
    if (leads) {
      results.push(
        ...leads
          .filter(l => l.firstName.toLowerCase().includes(searchLower) || l.lastName.toLowerCase().includes(searchLower) || l.company?.toLowerCase().includes(searchLower))
          .map(l => ({ id: l.id, type: 'Lead', name: `${l.firstName} ${l.lastName}`, icon: <User className="h-4 w-4 text-green-500" />, path: `/dashboard/crm/leads/${l.id}` }))
      );
    }

    if (opportunities) {
      results.push(
        ...opportunities
          .filter(o => o.name.toLowerCase().includes(searchLower))
          .map(o => ({ id: o.id, type: 'Opportunity', name: o.name, icon: <Target className="h-4 w-4 text-purple-500" />, path: `/dashboard/crm/opportunities/${o.id}` }))
      );
    }

    return results.slice(0, 8); // Limit to top 8 results
  };

  const results = getResults();

  const handleSelect = (path: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden shadow-2xl">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, customers, opportunities..." 
            className="flex h-14 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {!query && (
            <div className="p-4 text-center text-sm text-gray-500">
              Type to start searching...
            </div>
          )}
          {query && results.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          )}
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() => handleSelect(result.path)}
              className="flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex-shrink-0">
                {result.icon}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{result.name}</p>
                <p className="text-xs text-gray-500">{result.type}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
