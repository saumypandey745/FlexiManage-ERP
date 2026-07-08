import { TenantStatus, SubscriptionPlan } from '@prisma/client';
export declare class CreateTenantDto {
    name: string;
    status?: TenantStatus;
    subscription?: SubscriptionPlan;
    timezone?: string;
    currency?: string;
}
declare const UpdateTenantDto_base: import("@nestjs/common").Type<Partial<CreateTenantDto>>;
export declare class UpdateTenantDto extends UpdateTenantDto_base {
}
export {};
