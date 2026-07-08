"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notification_service_1 = require("../services/notification.service");
const notification_repository_1 = require("../repositories/notification.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const notification_dto_1 = require("../dto/notification.dto");
describe('NotificationService', () => {
    let service;
    const mockRepo = {
        create: jest.fn().mockResolvedValue({ id: 'notif-1', title: 'Test' }),
        findById: jest.fn().mockResolvedValue({ id: 'notif-1', title: 'Test' }),
        findMany: jest.fn().mockResolvedValue([[{ id: 'notif-1' }], 1]),
        update: jest.fn().mockResolvedValue({ id: 'notif-1' }),
        softDelete: jest.fn().mockResolvedValue({ id: 'notif-1' }),
    };
    const mockPrisma = {
        notificationRecipient: {
            findFirst: jest.fn().mockResolvedValue({ id: 'rec-1' }),
            update: jest.fn().mockResolvedValue({ id: 'rec-1', isRead: true }),
        }
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                notification_service_1.NotificationService,
                { provide: notification_repository_1.NotificationRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(notification_service_1.NotificationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a notification', async () => {
        const dto = {
            type: notification_dto_1.NotificationType.SYSTEM,
            title: 'Test',
            body: 'Body',
            recipientIds: ['user-1'],
            channels: [notification_dto_1.NotificationChannel.IN_APP]
        };
        const res = await service.create('tenant-1', 'sender-1', dto);
        expect(res.id).toBe('notif-1');
        expect(mockRepo.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=notification.service.spec.js.map