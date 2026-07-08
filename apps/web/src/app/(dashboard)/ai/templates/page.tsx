import React from 'react';
import { PromptTemplateTable } from '@/features/ai/components/PromptTemplateTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PromptTemplatePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PromptTemplates</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your prompttemplates here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <PromptTemplateTable />
    </div>
  );
}
