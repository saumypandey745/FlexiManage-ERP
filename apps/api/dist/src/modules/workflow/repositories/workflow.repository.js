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
exports.WorkflowRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let WorkflowRepository = class WorkflowRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, dto) {
        return this.prisma.workflow.create({
            data: {
                tenantId,
                code: dto.code,
                name: dto.name,
                description: dto.description,
            }
        });
    }
    async findMany(tenantId, skip = 0, take = 20) {
        return Promise.all([
            this.prisma.workflow.findMany({
                where: { tenantId, deletedAt: null },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            }),
            this.prisma.workflow.count({
                where: { tenantId, deletedAt: null }
            })
        ]);
    }
    async findById(tenantId, id) {
        return this.prisma.workflow.findUnique({
            where: { id, tenantId },
            include: {
                nodes: true,
                edges: true
            }
        });
    }
    async update(tenantId, id, dto, currentVersion) {
        return this.prisma.workflow.update({
            where: { id, tenantId, version: currentVersion },
            data: {
                ...dto,
                version: { increment: 1 }
            }
        });
    }
    async addNode(tenantId, workflowId, dto) {
        return this.prisma.workflowNode.create({
            data: {
                tenantId,
                workflowId,
                type: dto.type,
                name: dto.name,
                config: dto.config || {},
                positionX: dto.positionX || 0,
                positionY: dto.positionY || 0,
            }
        });
    }
    async addEdge(tenantId, workflowId, dto) {
        return this.prisma.workflowEdge.create({
            data: {
                tenantId,
                workflowId,
                sourceId: dto.sourceId,
                targetId: dto.targetId,
                condition: dto.condition
            }
        });
    }
    async softDelete(tenantId, id) {
        return this.prisma.workflow.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: 'ARCHIVED' }
        });
    }
};
exports.WorkflowRepository = WorkflowRepository;
exports.WorkflowRepository = WorkflowRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowRepository);
//# sourceMappingURL=workflow.repository.js.map