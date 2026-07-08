const fs = require('fs');
const path = require('path');

const appsWebSrc = path.join(__dirname, 'apps/web/src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// --------------------------------------------------------
// 1. SCHEMAS
// --------------------------------------------------------

const hrmsSchemas = `
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().optional().or(z.literal('')),
  department: z.string().optional(),
  designation: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'TERMINATED']).default('ACTIVE')
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;

export const createLeaveSchema = z.object({
  leaveTypeId: z.string().min(1, 'Leave type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(1, 'Reason is required')
});
export type CreateLeaveInput = z.infer<typeof createLeaveSchema>;
`;

const inventorySchemas = `
import { z } from 'zod';

export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  categoryId: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  uom: z.string().optional(),
  barcode: z.string().optional(),
  reorderLevel: z.number().optional(),
  safetyStock: z.number().optional()
});
export type CreateProductInput = z.infer<typeof createProductSchema>;

export const createWarehouseSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  location: z.string().optional(),
  capacity: z.number().optional()
});
export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;
`;

const financeSchemas = `
import { z } from 'zod';

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  customerId: z.string().min(1, 'Customer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  subTotal: z.number().min(0),
  taxTotal: z.number().min(0),
  totalAmount: z.number().min(0),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']).default('DRAFT')
});
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

export const createExpenseSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional()
});
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
`;

const projectSchemas = `
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED']).default('PLANNING')
});
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  projectId: z.string().min(1, 'Project is required'),
  assigneeId: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']).default('TODO')
});
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
`;

// --------------------------------------------------------
// 2. API HOOKS
// --------------------------------------------------------
const genericHooksTemplate = (module, entity, pathName) => {
  const entityLower = entity.toLowerCase();
  return `
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface ${entity} {
  id: string;
  [key: string]: unknown;
}

export function use${entity}s(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['${module}', '${entityLower}s', params],
    queryFn: async () => {
      const res = await apiClient.get<${entity}[]>('/${pathName}', { params });
      return res.data;
    },
  });
}

export function use${entity}(id: string) {
  return useQuery({
    queryKey: ['${module}', '${entityLower}', id],
    queryFn: async () => {
      const res = await apiClient.get<${entity}>(\`/${pathName}/\${id}\`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreate${entity}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post<${entity}>('/${pathName}', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${module}', '${entityLower}s'] });
    },
  });
}

export function useUpdate${entity}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiClient.patch<${entity}>(\`/${pathName}/\${id}\`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['${module}', '${entityLower}s'] });
      queryClient.invalidateQueries({ queryKey: ['${module}', '${entityLower}', variables.id] });
    },
  });
}

export function useDelete${entity}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(\`/${pathName}/\${id}\`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${module}', '${entityLower}s'] });
    },
  });
}
`;
};

// --------------------------------------------------------
// 3. COMPONENTS
// --------------------------------------------------------
const tableComponentTemplate = (module, entity, pathName) => `
'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { use${entity}s } from '../api/${entity.toLowerCase()}.hooks';
import { Skeleton } from '@/components/ui/skeleton';

export function ${entity}Table() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  
  const { data: records = [], isLoading } = use${entity}s();

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name', cell: (info) => info.getValue() || 'N/A' },
    { accessorKey: 'status', header: 'Status', cell: (info) => info.getValue() || 'ACTIVE' },
    { accessorKey: 'createdAt', header: 'Created', cell: (info) => {
        const val = info.getValue() as string;
        return val ? new Date(val).toLocaleDateString() : '';
      } 
    }
  ];

  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-sm" />
      <Skeleton className="h-64 w-full" />
    </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search..." 
          value={globalFilter ?? ''} 
          onChange={(e) => setGlobalFilter(e.target.value)} 
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-white dark:bg-gray-900">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
`;

// --------------------------------------------------------
// 4. PAGES
// --------------------------------------------------------
const pageTemplate = (moduleName, entityName, title) => `
import React from 'react';
import { ${entityName}Table } from '@/features/${moduleName}/components/${entityName}Table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ${entityName}Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your ${title.toLowerCase()} here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <${entityName}Table />
    </div>
  );
}
`;

// Dashboard Template for Modules
const dashboardTemplate = (moduleName, title) => `
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your ${title.toLowerCase()}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">+2% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
`;

// Helper for generic module creation
function createModule(moduleName, entities) {
  const featPath = path.join(appsWebSrc, 'features', moduleName);
  const appPath = path.join(appsWebSrc, 'app/(dashboard)', moduleName);
  
  ensureDir(path.join(featPath, 'api'));
  ensureDir(path.join(featPath, 'components'));
  ensureDir(path.join(featPath, 'schemas'));
  ensureDir(appPath);

  writeFile(path.join(appPath, 'page.tsx'), dashboardTemplate(moduleName, moduleName.toUpperCase() + ' Dashboard'));

  for (const ent of entities) {
    // API
    writeFile(path.join(featPath, 'api', ent.name.toLowerCase() + '.hooks.ts'), genericHooksTemplate(moduleName, ent.name, ent.path));
    // Component
    writeFile(path.join(featPath, 'components', ent.name + 'Table.tsx'), tableComponentTemplate(moduleName, ent.name, ent.path));
    // Page
    const pageDir = path.join(appPath, ent.path);
    ensureDir(pageDir);
    writeFile(path.join(pageDir, 'page.tsx'), pageTemplate(moduleName, ent.name, ent.name + 's'));
  }
}

// --------------------------------------------------------
// EXECUTION
// --------------------------------------------------------

// HRMS
writeFile(path.join(appsWebSrc, 'features/hrms/schemas/hrms.schema.ts'), hrmsSchemas);
createModule('hrms', [
  { name: 'Employee', path: 'employees' },
  { name: 'Leave', path: 'leaves' },
  { name: 'Attendance', path: 'attendance' },
  { name: 'Payroll', path: 'payroll' }
]);

// INVENTORY
writeFile(path.join(appsWebSrc, 'features/inventory/schemas/inventory.schema.ts'), inventorySchemas);
createModule('inventory', [
  { name: 'Product', path: 'products' },
  { name: 'Warehouse', path: 'warehouses' },
  { name: 'StockMovement', path: 'stock-movements' },
  { name: 'Supplier', path: 'suppliers' }
]);

// FINANCE
writeFile(path.join(appsWebSrc, 'features/finance/schemas/finance.schema.ts'), financeSchemas);
createModule('finance', [
  { name: 'Invoice', path: 'invoices' },
  { name: 'Expense', path: 'expenses' },
  { name: 'Payment', path: 'payments' },
  { name: 'Journal', path: 'journals' }
]);

// PROJECTS
writeFile(path.join(appsWebSrc, 'features/projects/schemas/projects.schema.ts'), projectSchemas);
createModule('projects', [
  { name: 'Project', path: 'projects' },
  { name: 'Task', path: 'tasks' },
  { name: 'Milestone', path: 'milestones' }
]);

// NOTIFICATIONS
createModule('notifications', [
  { name: 'Notification', path: 'inbox' },
  { name: 'Announcement', path: 'announcements' }
]);

// REPORTS
createModule('reports', [
  { name: 'Report', path: 'saved' },
  { name: 'Analytics', path: 'analytics' }
]);

// AI
createModule('ai', [
  { name: 'PromptTemplate', path: 'templates' },
  { name: 'ChatHistory', path: 'history' }
]);

console.log('Successfully generated all Phase 08E files.');
