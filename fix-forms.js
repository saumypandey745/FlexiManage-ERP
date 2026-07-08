const fs = require('fs');
const path = require('path');

const forms = [
  'apps/web/src/features/crm/contact-management/components/ContactForm.tsx',
  'apps/web/src/features/crm/customer-management/components/CustomerForm.tsx',
  'apps/web/src/features/crm/lead-management/components/LeadForm.tsx',
  'apps/web/src/features/crm/opportunity-management/components/OpportunityForm.tsx'
];

forms.forEach(form => {
  const fullPath = path.resolve(__dirname, form);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/catch \(error: unknown\) \{/g, 'catch (err: unknown) {\n      const error = err as Error;');
    fs.writeFileSync(fullPath, content, 'utf8');
  }
});
