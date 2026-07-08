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
exports.DashboardRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DashboardRepository = class DashboardRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, userId, dto) {
        return this.prisma.dashboard.create({
            data: {
                tenantId,
                createdBy: userId,
                name: dto.name,
                description: dto.description,
                layout: dto.layout || {},
                isDefault: dto.isDefault || false,
            },
        });
    }
    async findMany(tenantId, params) {
        const { skip, take } = params;
        return Promise.all([
            this.prisma.dashboard.findMany({
                skip,
                take,
                where: { tenantId, deletedAt: null },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.dashboard.count({
                where: { tenantId, deletedAt: null },
            }),
        ]);
    }
    async findById(tenantId, id) {
        return this.prisma.dashboard.findUnique({
            where: { id, tenantId, deletedAt: null },
            include: {
                widgets: true,
            }
        });
    }
    async update(tenantId, id, dto) {
        return this.prisma.dashboard.update({
            where: { id, tenantId },
            data: dto,
        });
    }
    async softDelete(tenantId, id) {
        return this.prisma.dashboard.update({
            where: { id, tenantId },
            data: { deletedAt: new Date() },
        });
    }
    async addWidget(tenantId, dashboardId, dto) {
        return this.prisma.dashboardWidget.create({
            data: {
                tenantId,
                dashboardId,
                name: dto.name,
                type: dto.type,
                chartType: dto.chartType,
                positionX: dto.positionX || 0,
                positionY: dto.positionY || 0,
                width: dto.width || 1,
                height: dto.height || 1,
                dataSource: dto.dataSource,
                config: dto.config || {}
            }
        });
    }
    async removeWidget(tenantId, widgetId) {
        return this.prisma.dashboardWidget.delete({
            where: { id: widgetId, tenantId }
        });
    }
};
exports.DashboardRepository = DashboardRepository;
exports.DashboardRepository = DashboardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardRepository);
//# sourceMappingURL=dashboard.repository.js.map