"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const env_validation_1 = require("./config/env.validation");
const prisma_module_1 = require("./common/prisma/prisma.module");
const redis_module_1 = require("./common/cache/redis.module");
const logger_module_1 = require("./common/logger/logger.module");
const auth_module_1 = require("./modules/auth/auth.module");
const organization_module_1 = require("./modules/organization/organization.module");
const rbac_module_1 = require("./modules/rbac/rbac.module");
const user_module_1 = require("./modules/users/user.module");
const crm_module_1 = require("./modules/crm/crm.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const finance_module_1 = require("./modules/finance/finance.module");
const hrms_module_1 = require("./modules/hrms/hrms.module");
const projects_module_1 = require("./modules/projects/projects.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const reports_module_1 = require("./modules/reports/reports.module");
const ai_module_1 = require("./modules/ai/ai.module");
const workflow_module_1 = require("./modules/workflow/workflow.module");
const documents_module_1 = require("./modules/documents/documents.module");
const integrations_module_1 = require("./modules/integrations/integrations.module");
const billing_module_1 = require("./modules/billing/billing.module");
const health_module_1 = require("./modules/health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: (config) => env_validation_1.envValidationSchema.parse(config),
                envFilePath: ['.env.local', '.env'],
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 100,
            }),
            logger_module_1.LoggerConfigModule,
            prisma_module_1.PrismaModule,
            redis_module_1.RedisCacheModule,
            auth_module_1.AuthModule,
            organization_module_1.OrganizationModule,
            rbac_module_1.RbacModule,
            user_module_1.UserModule,
            crm_module_1.CrmModule,
            inventory_module_1.InventoryModule,
            finance_module_1.FinanceModule,
            hrms_module_1.HrmsModule,
            projects_module_1.ProjectsModule,
            notifications_module_1.NotificationsModule,
            reports_module_1.ReportsModule,
            ai_module_1.AiModule,
            workflow_module_1.WorkflowModule,
            documents_module_1.DocumentsModule,
            integrations_module_1.IntegrationsModule,
            billing_module_1.BillingModule,
            health_module_1.HealthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map