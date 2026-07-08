"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_service_1 = require("../services/chat.service");
const chat_repository_1 = require("../repositories/chat.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('ChatService', () => {
    let service;
    const mockRepo = {
        createRoom: jest.fn().mockResolvedValue({ id: 'room-1', name: 'General' }),
        findRoomById: jest.fn().mockResolvedValue({ id: 'room-1', participants: [{ userId: 'user-1' }] }),
        findRooms: jest.fn().mockResolvedValue([[{ id: 'room-1' }], 1]),
        createMessage: jest.fn().mockResolvedValue({ id: 'msg-1', content: 'Hello' }),
        findMessagesByRoom: jest.fn().mockResolvedValue([[{ id: 'msg-1' }], 1]),
    };
    const mockPrisma = {};
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                chat_service_1.ChatService,
                { provide: chat_repository_1.ChatRepository, useValue: mockRepo },
                { provide: prisma_service_1.PrismaService, useValue: mockPrisma },
            ],
        }).compile();
        service = module.get(chat_service_1.ChatService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should send a message', async () => {
        const dto = { roomId: 'room-1', content: 'Hello' };
        const res = await service.sendMessage('tenant-1', 'user-1', dto);
        expect(res.id).toBe('msg-1');
        expect(mockRepo.createMessage).toHaveBeenCalled();
    });
});
//# sourceMappingURL=chat.service.spec.js.map