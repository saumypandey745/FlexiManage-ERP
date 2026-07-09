import { Injectable, NotFoundException } from "@nestjs/common";
import { ChatRepository } from "../repositories/chat.repository";
import { CreateChatRoomDto, SendMessageDto } from "../dto/chat.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly prisma: PrismaService
  ) {}

  async createRoom(tenantId: string, userId: string, dto: CreateChatRoomDto) {
    const participantIds = Array.from(new Set([...dto.participantIds, userId]));

    return this.chatRepository.createRoom({
      tenant: { connect: { id: tenantId } },
      name: dto.name,
      isGroup: dto.isGroup,
      participants: {
        create: participantIds.map((id) => ({
          user: { connect: { id } },
        })),
      },
    });
  }

  async getRooms(tenantId: string, userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.chatRepository.findRooms(
      tenantId,
      userId,
      { skip, take: limit }
    );
    return { data, total, page, limit };
  }

  async sendMessage(tenantId: string, senderId: string, dto: SendMessageDto) {
    const room = await this.chatRepository.findRoomById(tenantId, dto.roomId);
    if (!room) throw new NotFoundException("Chat room not found");

    const participant = room.participants.find((p) => p.userId === senderId);
    if (!participant)
      throw new NotFoundException("User is not a participant in this room");

    const message = await this.chatRepository.createMessage({
      room: { connect: { id: dto.roomId } },
      sender: { connect: { id: senderId } },
      content: dto.content,
      type: dto.type || "TEXT",
      status: "SENT",
    });

    // TODO: Emit WebSocket event to room participants

    return message;
  }

  async getMessages(
    tenantId: string,
    roomId: string,
    userId: string,
    page = 1,
    limit = 50
  ) {
    const room = await this.chatRepository.findRoomById(tenantId, roomId);
    if (!room) throw new NotFoundException("Chat room not found");

    const participant = room.participants.find((p) => p.userId === userId);
    if (!participant)
      throw new NotFoundException("User is not a participant in this room");

    const skip = (page - 1) * limit;
    const [data, total] = await this.chatRepository.findMessagesByRoom(
      tenantId,
      roomId,
      { skip, take: limit }
    );
    return { data, total, page, limit };
  }
}
