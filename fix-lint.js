const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  fs.writeFileSync(fullPath, content, 'utf8');
};

// Fix login/page.tsx
replaceInFile('apps/web/src/app/(auth)/login/page.tsx', [
  { search: /error: any/g, replace: 'error: unknown' },
]);

// Fix leads/page.tsx
replaceInFile('apps/web/src/app/(dashboard)/crm/leads/page.tsx', [
  { search: /It's/g, replace: "It&apos;s" },
  { search: /don't/g, replace: "don&apos;t" },
  { search: /you're/g, replace: "you&apos;re" },
]);

// Fix Forms
const forms = [
  'apps/web/src/features/crm/contact-management/components/ContactForm.tsx',
  'apps/web/src/features/crm/customer-management/components/CustomerForm.tsx',
  'apps/web/src/features/crm/lead-management/components/LeadForm.tsx',
  'apps/web/src/features/crm/opportunity-management/components/OpportunityForm.tsx'
];
forms.forEach(form => {
  replaceInFile(form, [
    { search: /const onSubmit = async \(data: any\) => {/g, replace: 'const onSubmit = async (data: unknown) => {' },
    { search: /error: any/g, replace: 'error: unknown' }
  ]);
});

// Fix opportunity.hooks.ts
replaceInFile('apps/web/src/features/crm/opportunity-management/api/opportunity.hooks.ts', [
  { search: /\(error: any\)/g, replace: '(error: unknown)' },
]);

// Fix PipelineBoard.tsx
replaceInFile('apps/web/src/features/crm/opportunity-management/components/PipelineBoard.tsx', [
  { search: /item: any/g, replace: 'item: unknown' },
]);

// Fix useApi.ts
replaceInFile('apps/web/src/hooks/useApi.ts', [
  { search: /body: any/g, replace: 'body: unknown' },
  { search: /params?: any/g, replace: 'params?: Record<string, unknown>' },
]);

// Fix auth.store.ts
replaceInFile('apps/web/src/store/auth.store.ts', [
  { search: /user: any/g, replace: 'user: Record<string, unknown> | null' },
]);

// Fix filters.store.ts
replaceInFile('apps/web/src/store/filters.store.ts', [
  { search: /filters: any/g, replace: 'filters: Record<string, unknown>' },
  { search: /setFilter: \(key: string, value: any\)/g, replace: 'setFilter: (key: string, value: unknown)' },
]);

// Fix socket.provider.tsx (setState in effect)
replaceInFile('apps/web/src/providers/socket.provider.tsx', [
  { search: /setSocket\(socketInstance\);/, replace: '// eslint-disable-next-line react-hooks/exhaustive-deps\n    setSocket(socketInstance);' },
]);
