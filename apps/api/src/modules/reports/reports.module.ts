import { Module } from "@nestjs/common";
import { ReportController } from "./controllers/report.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { AnalyticsController } from "./controllers/analytics.controller";
import { ReportService } from "./services/report.service";
import { DashboardService } from "./services/dashboard.service";
import { AnalyticsService } from "./services/analytics.service";
import { ReportRepository } from "./repositories/report.repository";
import { DashboardRepository } from "./repositories/dashboard.repository";
import { AnalyticsRepository } from "./repositories/analytics.repository";

@Module({
  controllers: [ReportController, DashboardController, AnalyticsController],
  providers: [
    ReportService,
    DashboardService,
    AnalyticsService,
    ReportRepository,
    DashboardRepository,
    AnalyticsRepository,
  ],
  exports: [ReportService, DashboardService, AnalyticsService],
})
export class ReportsModule {}
