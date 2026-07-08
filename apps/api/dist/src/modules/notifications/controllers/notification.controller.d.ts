import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(req: any, dto: CreateNotificationDto): Promise<{
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
    findAll(req: any, page?: number, limit?: number): Promise<{
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
    markAsRead(req: any, id: string): Promise<{
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
