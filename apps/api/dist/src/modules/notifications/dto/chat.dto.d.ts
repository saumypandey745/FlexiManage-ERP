import { MessageType, WebhookStatus } from '@prisma/client';
export declare class CreateChatRoomDto {
    name?: string;
    isGroup: boolean;
    participantIds: string[];
}
export declare class SendMessageDto {
    roomId: string;
    content: string;
    type?: MessageType;
}
export declare class UpdatePreferenceDto {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    inAppEnabled: boolean;
}
export declare class WebhookDto {
    name: string;
    url: string;
    secret?: string;
    events: string[];
    status?: WebhookStatus;
}
