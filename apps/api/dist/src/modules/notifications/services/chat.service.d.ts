import { ChatRepository } from '../repositories/chat.repository';
import { CreateChatRoomDto, SendMessageDto } from '../dto/chat.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ChatService {
    private readonly chatRepository;
    private readonly prisma;
    constructor(chatRepository: ChatRepository, prisma: PrismaService);
    createRoom(tenantId: string, userId: string, dto: CreateChatRoomDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string | null;
        isGroup: boolean;
    }>;
    getRooms(tenantId: string, userId: string, page?: number, limit?: number): Promise<{
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
    sendMessage(tenantId: string, senderId: string, dto: SendMessageDto): Promise<{
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
    getMessages(tenantId: string, roomId: string, userId: string, page?: number, limit?: number): Promise<{
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
