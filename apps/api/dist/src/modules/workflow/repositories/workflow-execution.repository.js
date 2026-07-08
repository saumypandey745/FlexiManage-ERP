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
exports.WorkflowExecutionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let WorkflowExecutionRepository = class WorkflowExecutionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createExecution(tenantId, workflowId, triggerData) {
        return this.prisma.workflowExecution.create({
            data: {
                tenantId,
                workflowId,
                status: 'PENDING',
                triggerData: triggerData || {},
            }
        });
    }
    async getExecution(tenantId, id) {
        return this.prisma.workflowExecution.findUnique({
            where: { id, tenantId },
            include: {
                variables: true,
                logs: {
                    orderBy: { createdAt: 'desc' },
                    take: 50
                }
            }
        });
    }
    async updateStatus(tenantId, id, status, completedAt) {
        return this.prisma.workflowExecution.update({
            where: { id, tenantId },
            data: { status, completedAt, startedAt: status === 'RUNNING' ? new Date() : undefined }
        });
    }
    async setVariable(tenantId, executionId, key, value) {
        return this.prisma.workflowVariable.upsert({
            where: {
                executionId_key: { executionId, key }
            },
            update: { value },
            create: {
                tenantId,
                executionId,
                key,
                value
            }
        });
    }
    async addLog(tenantId, executionId, level, message, nodeId, details) {
        return this.prisma.workflowLog.create({
            data: {
                tenantId,
                executionId,
                nodeId,
                level,
                message,
                details: details || {}
            }
        });
    }
};
exports.WorkflowExecutionRepository = WorkflowExecutionRepository;
exports.WorkflowExecutionRepository = WorkflowExecutionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowExecutionRepository);
//# sourceMappingURL=workflow-execution.repository.js.map