export declare enum NotificationType {
    SYSTEM = "SYSTEM",
    ALERT = "ALERT",
    REMINDER = "REMINDER",
    MESSAGE = "MESSAGE",
    ANNOUNCEMENT = "ANNOUNCEMENT"
}
export declare enum NotificationChannel {
    EMAIL = "EMAIL",
    SMS = "SMS",
    PUSH = "PUSH",
    IN_APP = "IN_APP",
    WEBHOOK = "WEBHOOK"
}
export declare enum AnnouncementPriority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare enum RecipientType {
    USER = "USER",
    ROLE = "ROLE",
    DEPARTMENT = "DEPARTMENT",
    ALL = "ALL"
}
export declare class CreateNotificationDto {
    type: NotificationType;
    title: string;
    body: string;
    data?: any;
    recipientIds: string[];
    channels: NotificationChannel[];
}
export declare class SendEmailDto {
    recipientEmail: string;
    subject: string;
    body: string;
}
export declare class SendSmsDto {
    phoneNumber: string;
    message: string;
}
export declare class PushNotificationDto {
    deviceToken: string;
    title: string;
    body: string;
}
export declare class CreateAnnouncementDto {
    title: string;
    content: string;
    priority?: AnnouncementPriority;
    validUntil?: string;
    recipientType: RecipientType;
    recipientIds?: string[];
}
