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
