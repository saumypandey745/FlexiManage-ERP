"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const integration_service_1 = require("../services/integration.service");
const integration_repository_1 = require("../repositories/integration.repository");
const encryption_service_1 = require("../services/encryption.service");
describe('IntegrationService', () => {
    let service;
    const mockRepo = {
        connect: jest.fn().mockResolvedValue({ id: 'int-1', provider: 'STRIPE' }),
        getIntegration: jest.fn().mockResolvedValue({ id: 'int-1', provider: 'STRIPE', credentials: [] }),
        logAudit: jest.fn().mockResolvedValue(true),
    };
    const mockEncryption = {
        encrypt: jest.fn().mockReturnValue({ encryptedValue: 'enc', iv: 'iv' }),
        decrypt: jest.fn().mockReturnValue('decrypted'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                integration_service_1.IntegrationService,
                { provide: integration_repository_1.IntegrationRepository, useValue: mockRepo },
                { provide: encryption_service_1.EncryptionService, useValue: mockEncryption }
            ],
        }).compile();
        service = module.get(integration_service_1.IntegrationService);
    });
    it('should connect an integration', async () => {
        const res = await service.connect('tenant-1', 'user-1', {
            provider: 'STRIPE',
            category: 'PAYMENT',
            name: 'My Stripe'
        });
        expect(res.provider).toBe('STRIPE');
        expect(mockRepo.logAudit).toHaveBeenCalledWith('int-1', 'user-1', 'CONNECT');
    });
    it('should get decrypted credentials', async () => {
        mockRepo.getIntegration.mockResolvedValueOnce({
            id: 'int-1',
            credentials: [{ keyName: 'API_KEY', encryptedValue: 'enc', iv: 'iv' }]
        });
        const res = await service.getDecryptedCredentials('tenant-1', 'int-1');
        expect(res['API_KEY']).toBe('decrypted');
    });
});
//# sourceMappingURL=integration.service.spec.js.map