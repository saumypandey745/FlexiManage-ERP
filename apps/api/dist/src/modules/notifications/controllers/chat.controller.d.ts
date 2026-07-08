import { ChatService } from '../services/chat.service';
import { CreateChatRoomDto, SendMessageDto } from '../dto/chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createRoom(req: any, dto: CreateChatRoomDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string | null;
        isGroup: boolean;
    }>;
    getRooms(req: any, page?: number, limit?: number): Promise<{
        data: ({
            _count: {
                messages: number;
            };
            participants: {
                id: string;
                userId: string;
                roomId: string;
                joinedAt: Date;
                leftAt: Date | null;
                lastReadMessageId: string | null;
            }[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string | null;
            isGroup: boolean;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    sendMessage(req: any, dto: SendMessageDto): Promise<{
        type: import(".prisma/client").$Enums.MessageType;
        status: import(".prisma/client").$Enums.MessageStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        content: string;
        senderId: string;
        roomId: string;
    }>;
    getMessages(req: any, roomId: string, page?: number, limit?: number): Promise<{
        data: {
            type: import(".prisma/client").$Enums.MessageType;
            status: import(".prisma/client").$Enums.MessageStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
            senderId: string;
            roomId: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
