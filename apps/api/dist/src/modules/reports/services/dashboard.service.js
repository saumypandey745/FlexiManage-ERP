"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const dashboard_repository_1 = require("../repositories/dashboard.repository");
let DashboardService = class DashboardService {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }
    async create(tenantId, userId, dto) {
        return this.dashboardRepository.create(tenantId, userId, dto);
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.dashboardRepository.findMany(tenantId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async findOne(tenantId, id) {
        const dashboard = await this.dashboardRepository.findById(tenantId, id);
        if (!dashboard)
            throw new common_1.NotFoundException('Dashboard not found');
        return dashboard;
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        return this.dashboardRepository.update(tenantId, id, dto);
    }
    async delete(tenantId, id) {
        await this.findOne(tenantId, id);
        return this.dashboardRepository.softDelete(tenantId, id);
    }
    async addWidget(tenantId, dashboardId, dto) {
        await this.findOne(tenantId, dashboardId);
        return this.dashboardRepository.addWidget(tenantId, dashboardId, dto);
    }
    async removeWidget(tenantId, dashboardId, widgetId) {
        await this.findOne(tenantId, dashboardId);
        return this.dashboardRepository.removeWidget(tenantId, widgetId);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_repository_1.DashboardRepository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map