import { NotificationRepository } from '../repositories/notification.repository';
import { CreateNotificationDto } from '../dto/notification.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly prisma;
    constructor(notificationRepository: NotificationRepository, prisma: PrismaService);
    create(tenantId: string, senderId: string, dto: CreateNotificationDto): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        status: import(".prisma/client").$Enums.NotificationStatus;
        title: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        body: string;
        senderId: string | null;
    }>;
    findAll(tenantId: string, page?: number, limit?: number): Promise<{
        data: {
            type: import(".prisma/client").$Enums.NotificationType;
            status: import(".prisma/client").$Enums.NotificationStatus;
            title: string;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            data: import("@prisma/client/runtime/library").JsonValue | null;
            body: string;
            senderId: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    markAsRead(tenantId: string, userId: string, notificationId: string): Promise<{
        status: import(".prisma/client").$Enums.DeliveryStatus;
        error: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notificationId: string;
        channel: import(".prisma/client").$Enums.NotificationChannel;
        isRead: boolean;
        readAt: Date | null;
    }>;
}
