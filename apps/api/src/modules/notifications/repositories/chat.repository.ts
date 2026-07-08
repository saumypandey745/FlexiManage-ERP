import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ChatRoom, ChatMessage, Prisma } from '@prisma/client';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(data: Prisma.ChatRoomCreateInput): Promise<ChatRoom> {
    return this.prisma.chatRoom.create({ data });
  }

  async findRoomById(tenantId: string, id: string) {
    return this.prisma.chatRoom.findUnique({
      where: { id, tenantId },
      include: {
        participants: true,
      }
    });
  }

  async findRooms(tenantId: string, userId: string, params: { skip?: number; take?: number }) {
    const { skip, take } = params;
    const where = {
      tenantId,
      participants: { some: { userId } },
      deletedAt: null
    };

    return Promise.all([
      this.prisma.chatRoom.findMany({
        skip,
        take,
        where,
        include: { participants: true, _count: { select: { messages: true } } },
        orderBy: { updatedAt: 'desc' }
      }),
      this.prisma.chatRoom.count({ where })
    ]);
  }

  async createMessage(data: Prisma.ChatMessageCreateInput): Promise<ChatMessage> {
    return this.prisma.chatMessage.create({ data });
  }

  async findMessagesByRoom(tenantId: string, roomId: string, params: { skip?: number; take?: number }): Promise<[ChatMessage[], number]> {
    const { skip, take } = params;
    const where = {
      roomId,
      room: { tenantId },
      deletedAt: null
    };

    return Promise.all([
      this.prisma.chatMessage.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.chatMessage.count({ where })
    ]);
  }
}
