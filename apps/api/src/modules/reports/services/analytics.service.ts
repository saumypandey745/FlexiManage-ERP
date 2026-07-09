import { Injectable } from "@nestjs/common";
import { AnalyticsRepository } from "../repositories/analytics.repository";

@Injectable()
export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async getMetrics(tenantId: string) {
    return this.analyticsRepository.findMetrics(tenantId);
  }

  async getKpiData(
    tenantId: string,
    metricId: string,
    fromDate: Date,
    toDate: Date
  ) {
    return this.analyticsRepository.findSnapshots(
      tenantId,
      metricId,
      fromDate,
      toDate
    );
  }

  async trackEvent(
    tenantId: string,
    eventName: string,
    payload: any,
    source: string,
    userId?: string
  ) {
    return this.analyticsRepository.trackEvent(
      tenantId,
      eventName,
      payload,
      source,
      userId
    );
  }
}
