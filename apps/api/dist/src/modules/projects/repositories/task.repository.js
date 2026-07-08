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
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TaskRepository = class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.task.create({ data });
    }
    async findById(tenantId, id) {
        return this.prisma.task.findUnique({
            where: { id, tenantId },
        });
    }
    async findMany(tenantId, params) {
        const { skip, take, where, orderBy } = params;
        return Promise.all([
            this.prisma.task.findMany({
                skip,
                take,
                where: { ...where, tenantId },
                orderBy,
            }),
            this.prisma.task.count({
                where: { ...where, tenantId },
            })
        ]);
    }
    async update(tenantId, id, data) {
        return this.prisma.task.update({
            where: { id, tenantId },
            data,
        });
    }
    async softDelete(tenantId, id) {
        return this.prisma.task.update({
            where: { id, tenantId },
            data: { deletedAt: new Date() },
        });
    }
};
exports.TaskRepository = TaskRepository;
exports.TaskRepository = TaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskRepository);
//# sourceMappingURL=task.repository.js.map