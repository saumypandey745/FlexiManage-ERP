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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const project_repository_1 = require("../repositories/project.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ProjectService = class ProjectService {
    constructor(projectRepository, prisma) {
        this.projectRepository = projectRepository;
        this.prisma = prisma;
    }
    async create(tenantId, userId, dto) {
        const existing = await this.prisma.project.findUnique({
            where: {
                tenantId_code: {
                    tenantId,
                    code: dto.code,
                },
            },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Project code ${dto.code} already exists`);
        }
        const project = await this.projectRepository.create({
            tenant: { connect: { id: tenantId } },
            name: dto.name,
            code: dto.code,
            description: dto.description,
            status: dto.status,
            priority: dto.priority,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            budget: dto.budget,
            customer: dto.customerId ? { connect: { id: dto.customerId } } : undefined,
            members: dto.memberIds ? {
                create: dto.memberIds.map(memberId => ({
                    tenant: { connect: { id: tenantId } },
                    user: { connect: { id: memberId } },
                    role: 'MEMBER'
                }))
            } : undefined
        });
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Project',
                entityId: project.id,
                newValues: { code: project.code },
            },
        });
        return project;
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.projectRepository.findMany(tenantId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async findOne(tenantId, id) {
        const project = await this.projectRepository.findById(tenantId, id);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async update(tenantId, userId, id, dto) {
        const project = await this.findOne(tenantId, id);
        const updated = await this.projectRepository.update(tenantId, id, {
            name: dto.name,
            description: dto.description,
            status: dto.status,
            priority: dto.priority,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            budget: dto.budget,
        });
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Project',
                entityId: id,
                newValues: { ...dto },
            },
        });
        return updated;
    }
    async remove(tenantId, userId, id) {
        const project = await this.findOne(tenantId, id);
        const incompleteTasks = await this.prisma.task.count({
            where: {
                tenantId,
                projectId: id,
                status: { notIn: ['DONE'] },
                deletedAt: null
            }
        });
        if (incompleteTasks > 0) {
            throw new common_1.BadRequestException('Cannot delete project with active tasks');
        }
        const deleted = await this.projectRepository.softDelete(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Project',
                entityId: id,
            },
        });
        return deleted;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository,
        prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map