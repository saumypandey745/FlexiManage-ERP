"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const report_controller_1 = require("./controllers/report.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const analytics_controller_1 = require("./controllers/analytics.controller");
const report_service_1 = require("./services/report.service");
const dashboard_service_1 = require("./services/dashboard.service");
const analytics_service_1 = require("./services/analytics.service");
const report_repository_1 = require("./repositories/report.repository");
const dashboard_repository_1 = require("./repositories/dashboard.repository");
const analytics_repository_1 = require("./repositories/analytics.repository");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            report_controller_1.ReportController,
            dashboard_controller_1.DashboardController,
            analytics_controller_1.AnalyticsController
        ],
        providers: [
            report_service_1.ReportService,
            dashboard_service_1.DashboardService,
            analytics_service_1.AnalyticsService,
            report_repository_1.ReportRepository,
            dashboard_repository_1.DashboardRepository,
            analytics_repository_1.AnalyticsRepository
        ],
        exports: [
            report_service_1.ReportService,
            dashboard_service_1.DashboardService,
            analytics_service_1.AnalyticsService
        ]
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map