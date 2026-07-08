import { z } from 'zod';
export declare const envValidationSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodDefault<z.ZodEffects<z.ZodString, number, string>>;
    FRONTEND_URL: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    REFRESH_SECRET: z.ZodString;
    REFRESH_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    REDIS_URL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    FRONTEND_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRES_IN: string;
    REDIS_URL?: string | undefined;
}, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: string | undefined;
    FRONTEND_URL?: string | undefined;
    JWT_EXPIRES_IN?: string | undefined;
    REFRESH_EXPIRES_IN?: string | undefined;
    REDIS_URL?: string | undefined;
}>;
export type EnvConfig = z.infer<typeof envValidationSchema>;
