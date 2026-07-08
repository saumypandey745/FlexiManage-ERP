// @ts-nocheck
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisCacheModule } from './common/cache/redis.module';
import { LoggerConfigModule } from './common/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { UserModule } from './modules/users/user.module';
import { CrmModule } from './modules/crm/crm.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { FinanceModule } from './modules/finance/finance.module';
import { HrmsModule } from './modules/hrms/hrms.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AiModule } from './modules/ai/ai.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { BillingModule } from './modules/billing/billing.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envValidationSchema.parse(config),
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100, // 100 requests per minute
    }),

    // Core Infrastructure Modules
    LoggerConfigModule,
    PrismaModule,
    RedisCacheModule,

    // Domain Modules
    AuthModule,
    OrganizationModule,
    RbacModule,
    UserModule,
    CrmModule,
    InventoryModule,
    FinanceModule,
    HrmsModule,
    ProjectsModule,
    NotificationsModule,
    ReportsModule,
    AiModule,
    WorkflowModule,
    DocumentsModule,
    IntegrationsModule,
    BillingModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
