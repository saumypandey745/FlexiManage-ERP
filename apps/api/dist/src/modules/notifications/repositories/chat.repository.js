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
exports.ChatRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ChatRepository = class ChatRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRoom(data) {
        return this.prisma.chatRoom.create({ data });
    }
    async findRoomById(tenantId, id) {
        return this.prisma.chatRoom.findUnique({
            where: { id, tenantId },
            include: {
                participants: true,
            }
        });
    }
    async findRooms(tenantId, userId, params) {
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
    async createMessage(data) {
        return this.prisma.chatMessage.create({ data });
    }
    async findMessagesByRoom(tenantId, roomId, params) {
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
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatRepository);
//# sourceMappingURL=chat.repository.js.map