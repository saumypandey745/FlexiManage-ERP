import { useEffect } from 'react';
import { useSocket } from '@/providers/socket.provider';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useRealTimeCRM = () => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleEvent = (eventKey: string, queryKeys: string[][], toastMessage?: (data: Record<string, unknown>) => string) => {
      socket.on(eventKey, (data: Record<string, unknown>) => {
        // Invalidate queries so TanStack auto-refetches the freshest data
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
        
        // Show optimistic live toast if needed
        if (toastMessage) {
          toast.info(toastMessage(data), {
            position: 'bottom-right',
            className: 'bg-blue-50 border-blue-200 text-blue-900'
          });
        }
      });
    };

    handleEvent('lead.created', [['crm', 'leads']], (data) => `New Lead created: ${data?.name || 'Unknown'}`);
    handleEvent('lead.updated', [['crm', 'leads']]);
    
    handleEvent('customer.created', [['crm', 'customers']], (data) => `New Customer: ${data?.name || 'Unknown'}`);
    handleEvent('customer.updated', [['crm', 'customers']]);
    
    handleEvent('opportunity.created', [['crm', 'opportunities']], (data) => `New Opportunity: ${data?.name || 'Unknown'}`);
    handleEvent('opportunity.updated', [['crm', 'opportunities']]);
    handleEvent('pipeline.updated', [['crm', 'opportunities']]);
    
    handleEvent('activity.created', [['crm', 'activities']], (data) => `Activity Update: ${data?.type || 'Logged'}`);
    handleEvent('notification.created', [['crm', 'notifications']]);

    socket.on('dashboard.refresh', () => {
      queryClient.invalidateQueries({ queryKey: ['crm'] });
      toast.success('Dashboard live-refreshed via server.');
    });

    return () => {
      socket.off('lead.created');
      socket.off('lead.updated');
      socket.off('customer.created');
      socket.off('customer.updated');
      socket.off('opportunity.created');
      socket.off('opportunity.updated');
      socket.off('pipeline.updated');
      socket.off('activity.created');
      socket.off('notification.created');
      socket.off('dashboard.refresh');
    };
  }, [socket, isConnected, queryClient]);

  return { isConnected };
};
