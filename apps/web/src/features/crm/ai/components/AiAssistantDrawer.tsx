/* eslint-disable */
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Bot, Sparkles, Send, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI CRM Assistant. How can I help you today? Try asking for a sales summary, pipeline analysis, or drafting an email.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/ai/chat', { message: userMessage });
      // Assuming response.data.reply or similar based on typical AI endpoints
      // The exact field might vary, we'll try to extract the most logical string
      const assistantReply = response.data?.reply || response.data?.content || response.data?.message || JSON.stringify(response.data);
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error: unknown) {
      toast.error('Failed to communicate with AI Assistant');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error while processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "Sales Summary",
    "Pipeline Analysis",
    "Draft Follow-up Email"
  ];

  const handleQuickAction = (action: string) => {
    setInput(`Please generate a ${action.toLowerCase()}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full shadow-sm bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700">
          <Sparkles className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <SheetTitle>AI CRM Assistant</SheetTitle>
              <SheetDescription>
                Powered by Enterprise AI Gateway
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 -mx-6 scrollbar-hide">
          <div className="space-y-4 px-6 pb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-bl-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-none bg-gray-100 p-3 text-sm flex items-center space-x-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t pb-6">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {quickActions.map(action => (
              <button 
                key={action}
                onClick={() => handleQuickAction(action)}
                className="whitespace-nowrap rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center space-x-2">
            <Input 
              placeholder="Ask the AI Assistant..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-full"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
