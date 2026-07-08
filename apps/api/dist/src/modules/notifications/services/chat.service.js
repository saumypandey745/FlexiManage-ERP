"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_repository_1 = require("../repositories/chat.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ChatService = class ChatService {
    constructor(chatRepository, prisma) {
        this.chatRepository = chatRepository;
        this.prisma = prisma;
    }
    async createRoom(tenantId, userId, dto) {
        const participantIds = Array.from(new Set([...dto.participantIds, userId]));
        return this.chatRepository.createRoom({
            tenant: { connect: { id: tenantId } },
            name: dto.name,
            isGroup: dto.isGroup,
            participants: {
                create: participantIds.map(id => ({
                    user: { connect: { id } }
                }))
            }
        });
    }
    async getRooms(tenantId, userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.chatRepository.findRooms(tenantId, userId, { skip, take: limit });
        return { data, total, page, limit };
    }
    async sendMessage(tenantId, senderId, dto) {
        const room = await this.chatRepository.findRoomById(tenantId, dto.roomId);
        if (!room)
            throw new common_1.NotFoundException('Chat room not found');
        const participant = room.participants.find(p => p.userId === senderId);
        if (!participant)
            throw new common_1.NotFoundException('User is not a participant in this room');
        const message = await this.chatRepository.createMessage({
            room: { connect: { id: dto.roomId } },
            sender: { connect: { id: senderId } },
            content: dto.content,
            type: dto.type || 'TEXT',
            status: 'SENT'
        });
        return message;
    }
    async getMessages(tenantId, roomId, userId, page = 1, limit = 50) {
        const room = await this.chatRepository.findRoomById(tenantId, roomId);
        if (!room)
            throw new common_1.NotFoundException('Chat room not found');
        const participant = room.participants.find(p => p.userId === userId);
        if (!participant)
            throw new common_1.NotFoundException('User is not a participant in this room');
        const skip = (page - 1) * limit;
        const [data, total] = await this.chatRepository.findMessagesByRoom(tenantId, roomId, { skip, take: limit });
        return { data, total, page, limit };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_repository_1.ChatRepository,
        prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map