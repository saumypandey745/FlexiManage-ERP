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
exports.AiConversationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AiConversationRepository = class AiConversationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConversation(tenantId, userId, title, providerId) {
        return this.prisma.aiConversation.create({
            data: {
                tenantId,
                userId,
                title,
                providerId,
                status: 'ACTIVE'
            }
        });
    }
    async getConversation(tenantId, id) {
        return this.prisma.aiConversation.findUnique({
            where: { id, tenantId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
    }
    async findMany(tenantId, userId, skip = 0, take = 20) {
        return Promise.all([
            this.prisma.aiConversation.findMany({
                where: { tenantId, userId, deletedAt: null },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            }),
            this.prisma.aiConversation.count({
                where: { tenantId, userId, deletedAt: null }
            })
        ]);
    }
    async addMessage(tenantId, conversationId, role, content, toolCalls, toolResult) {
        return this.prisma.aiConversationMessage.create({
            data: {
                tenantId,
                conversationId,
                role,
                content,
                toolCalls,
                toolResult
            }
        });
    }
    async softDelete(tenantId, id) {
        return this.prisma.aiConversation.update({
            where: { id, tenantId },
            data: { deletedAt: new Date(), status: 'ARCHIVED' }
        });
    }
};
exports.AiConversationRepository = AiConversationRepository;
exports.AiConversationRepository = AiConversationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiConversationRepository);
//# sourceMappingURL=ai-conversation.repository.js.map