import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  
  DATABASE_URL: z.string().url(),
  
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_SECRET: z.string().min(32),
  REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  REDIS_URL: z.string().url().optional(),
  
  RESEND_API_KEY: z.string().startsWith('re_'),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  CLOUDINARY_API_KEY: z.string().min(10),
  CLOUDINARY_API_SECRET: z.string().min(10),
  
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
});

export type EnvConfig = z.infer<typeof envValidationSchema>;
