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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_repository_1 = require("../repositories/notification.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let NotificationService = class NotificationService {
    constructor(notificationRepository, prisma) {
        this.notificationRepository = notificationRepository;
        this.prisma = prisma;
    }
    async create(tenantId, senderId, dto) {
        const notification = await this.notificationRepository.create({
            tenant: { connect: { id: tenantId } },
            type: dto.type,
            title: dto.title,
            body: dto.body,
            data: dto.data ? dto.data : undefined,
            sender: { connect: { id: senderId } },
            recipients: {
                create: dto.recipientIds.flatMap(userId => dto.channels.map(channel => ({
                    user: { connect: { id: userId } },
                    channel,
                    status: 'PENDING'
                })))
            }
        });
        return notification;
    }
    async findAll(tenantId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.notificationRepository.findMany(tenantId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async markAsRead(tenantId, userId, notificationId) {
        const recipient = await this.prisma.notificationRecipient.findFirst({
            where: {
                notificationId,
                userId,
                notification: { tenantId }
            }
        });
        if (!recipient)
            throw new common_1.NotFoundException('Notification recipient not found');
        return this.prisma.notificationRecipient.update({
            where: { id: recipient.id },
            data: { isRead: true, readAt: new Date() }
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_repository_1.NotificationRepository,
        prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map