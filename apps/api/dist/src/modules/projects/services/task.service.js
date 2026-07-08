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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("../repositories/task.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TaskService = class TaskService {
    constructor(taskRepository, prisma) {
        this.taskRepository = taskRepository;
        this.prisma = prisma;
    }
    async create(tenantId, userId, dto) {
        const project = await this.prisma.project.findUnique({
            where: { id: dto.projectId, tenantId }
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const existingCode = await this.prisma.task.findUnique({
            where: {
                tenantId_projectId_code: {
                    tenantId,
                    projectId: dto.projectId,
                    code: dto.code
                }
            }
        });
        if (existingCode) {
            throw new common_1.BadRequestException(`Task code ${dto.code} already exists in project`);
        }
        if (dto.assigneeId) {
            await this.validateAssignee(tenantId, dto.assigneeId);
        }
        const task = await this.taskRepository.create({
            tenant: { connect: { id: tenantId } },
            project: { connect: { id: dto.projectId } },
            code: dto.code,
            title: dto.title,
            description: dto.description,
            status: dto.status,
            priority: dto.priority,
            type: dto.type,
            assignee: dto.assigneeId ? { connect: { id: dto.assigneeId } } : undefined,
            reporter: { connect: { id: userId } },
            milestone: dto.milestoneId ? { connect: { id: dto.milestoneId } } : undefined,
            sprint: dto.sprintId ? { connect: { id: dto.sprintId } } : undefined,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            estimatedHours: dto.estimatedHours
        });
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'CREATE',
                entityName: 'Task',
                entityId: task.id,
                newValues: { code: task.code },
            },
        });
        return task;
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.taskRepository.findMany(tenantId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async findOne(tenantId, id) {
        const task = await this.taskRepository.findById(tenantId, id);
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        return task;
    }
    async update(tenantId, userId, id, dto) {
        const task = await this.findOne(tenantId, id);
        if (dto.status === 'DONE' && task.status !== 'DONE') {
            const blockingDependencies = await this.prisma.taskDependency.findMany({
                where: {
                    taskId: id,
                    type: 'BLOCKS',
                    dependsOn: { status: { not: 'DONE' } }
                }
            });
            if (blockingDependencies.length > 0) {
                throw new common_1.BadRequestException('Cannot complete task due to uncompleted blocking dependencies');
            }
        }
        const updated = await this.taskRepository.update(tenantId, id, {
            title: dto.title,
            description: dto.description,
            status: dto.status,
            priority: dto.priority,
            type: dto.type,
            milestone: dto.milestoneId ? { connect: { id: dto.milestoneId } } : undefined,
            sprint: dto.sprintId ? { connect: { id: dto.sprintId } } : undefined,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            estimatedHours: dto.estimatedHours,
            completedAt: dto.status === 'DONE' ? new Date() : undefined
        });
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Task',
                entityId: id,
                newValues: { ...dto },
            },
        });
        return updated;
    }
    async assign(tenantId, userId, id, dto) {
        await this.findOne(tenantId, id);
        await this.validateAssignee(tenantId, dto.assigneeId);
        const updated = await this.taskRepository.update(tenantId, id, {
            assignee: { connect: { id: dto.assigneeId } }
        });
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'UPDATE',
                entityName: 'Task',
                entityId: id,
                newValues: { assigneeId: dto.assigneeId },
            },
        });
        return updated;
    }
    async remove(tenantId, userId, id) {
        await this.findOne(tenantId, id);
        const deleted = await this.taskRepository.softDelete(tenantId, id);
        await this.prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action: 'DELETE',
                entityName: 'Task',
                entityId: id,
            },
        });
        return deleted;
    }
    async validateAssignee(tenantId, assigneeId) {
        const user = await this.prisma.user.findUnique({
            where: { id: assigneeId, tenantId },
            include: { employee: true }
        });
        if (!user) {
            throw new common_1.NotFoundException('Assignee not found');
        }
        if (user.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Cannot assign inactive users');
        }
        if (user.employee && user.employee.status === 'TERMINATED') {
            throw new common_1.BadRequestException('Cannot assign terminated employees');
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository,
        prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map