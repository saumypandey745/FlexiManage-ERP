"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ai_service_1 = require("../services/ai.service");
const ai_gateway_service_1 = require("../providers/ai-gateway.service");
const ai_conversation_repository_1 = require("../repositories/ai-conversation.repository");
const ai_prompt_repository_1 = require("../repositories/ai-prompt.repository");
const ai_usage_repository_1 = require("../repositories/ai-usage.repository");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
describe('AiService', () => {
    let service;
    const mockProvider = {
        chat: jest.fn().mockResolvedValue({
            content: 'Hello',
            usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
            model: 'gpt-4o'
        })
    };
    const mockGateway = {
        getProvider: jest.fn().mockReturnValue(mockProvider)
    };
    const mockConvRepo = {
        createConversation: jest.fn().mockResolvedValue({ id: 'conv-1' }),
        getConversation: jest.fn().mockResolvedValue({ id: 'conv-1', messages: [] }),
        addMessage: jest.fn().mockResolvedValue({ id: 'msg-1' }),
    };
    const mockPromptRepo = {
        findByCode: jest.fn().mockResolvedValue({ systemPrompt: 'Sys' }),
    };
    const mockUsageRepo = {
        logUsage: jest.fn().mockResolvedValue(true)
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                ai_service_1.AiService,
                { provide: ai_gateway_service_1.AiGatewayService, useValue: mockGateway },
                { provide: ai_conversation_repository_1.AiConversationRepository, useValue: mockConvRepo },
                { provide: ai_prompt_repository_1.AiPromptRepository, useValue: mockPromptRepo },
                { provide: ai_usage_repository_1.AiUsageRepository, useValue: mockUsageRepo },
                { provide: prisma_service_1.PrismaService, useValue: {} },
            ],
        }).compile();
        service = module.get(ai_service_1.AiService);
    });
    it('should process a chat', async () => {
        const res = await service.chat('tenant-1', 'user-1', { message: 'Hi' });
        expect(res.content).toBe('Hello');
        expect(mockConvRepo.addMessage).toHaveBeenCalledTimes(2);
        expect(mockUsageRepo.logUsage).toHaveBeenCalled();
    });
});
//# sourceMappingURL=ai.service.spec.js.map