import { PrismaService } from '../../../common/prisma/prisma.service';
import { ChatRoom, ChatMessage, Prisma } from '@prisma/client';
export declare class ChatRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createRoom(data: Prisma.ChatRoomCreateInput): Promise<ChatRoom>;
    findRoomById(tenantId: string, id: string): Promise<({
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
    }) | null>;
    findRooms(tenantId: string, userId: string, params: {
        skip?: number;
        take?: number;
    }): Promise<[({
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
    })[], number]>;
    createMessage(data: Prisma.ChatMessageCreateInput): Promise<ChatMessage>;
    findMessagesByRoom(tenantId: string, roomId: string, params: {
        skip?: number;
        take?: number;
    }): Promise<[ChatMessage[], number]>;
}
