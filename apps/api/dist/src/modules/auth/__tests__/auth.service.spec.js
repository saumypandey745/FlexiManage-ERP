"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("../auth.service");
const auth_repository_1 = require("../auth.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../../../common/cache/redis.service");
const email_service_1 = require("../../email/email.service");
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
jest.mock('argon2');
describe('AuthService', () => {
    let service;
    let authRepository;
    let redisCacheService;
    let jwtService;
    let emailService;
    beforeEach(async () => {
        authRepository = {
            findUserByEmail: jest.fn(),
            createTenantWithAdmin: jest.fn(),
            findById: jest.fn(),
            updateUserPassword: jest.fn(),
        };
        redisCacheService = {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
        };
        jwtService = {
            signAsync: jest.fn().mockResolvedValue('mockToken'),
        };
        emailService = {
            sendWelcomeEmail: jest.fn(),
            sendVerifyEmail: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: auth_repository_1.AuthRepository, useValue: authRepository },
                { provide: redis_service_1.RedisCacheService, useValue: redisCacheService },
                { provide: jwt_1.JwtService, useValue: jwtService },
                { provide: config_1.ConfigService, useValue: { get: jest.fn() } },
                { provide: email_service_1.EmailService, useValue: emailService },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    describe('login', () => {
        it('should throw exception if account is locked out', async () => {
            redisCacheService.get.mockResolvedValueOnce(5);
            await expect(service.login({ email: 'test@test.com', password: 'pw' }, '127.0.0.1'))
                .rejects
                .toThrow('Account locked due to multiple failed login attempts');
        });
        it('should throw UnauthorizedException for invalid email', async () => {
            redisCacheService.get.mockResolvedValueOnce(0);
            authRepository.findUserByEmail.mockResolvedValueOnce(null);
            await expect(service.login({ email: 'wrong@test.com', password: 'pw' }, '127.0.0.1'))
                .rejects
                .toThrow(common_1.UnauthorizedException);
            expect(redisCacheService.set).toHaveBeenCalled();
        });
        it('should return tokens on valid login', async () => {
            const mockUser = {
                id: '1',
                tenantId: 't1',
                email: 'admin@test.com',
                status: 'ACTIVE',
                passwordHash: 'hashedPw',
            };
            redisCacheService.get.mockResolvedValueOnce(0);
            authRepository.findUserByEmail.mockResolvedValueOnce(mockUser);
            argon2.verify.mockResolvedValueOnce(true);
            const result = await service.login({ email: 'admin@test.com', password: 'pw' }, '127.0.0.1');
            expect(result.accessToken).toBe('mockToken');
            expect(result.refreshToken).toBe('mockToken');
            expect(redisCacheService.del).toHaveBeenCalled();
        });
    });
    describe('registerTenant', () => {
        it('should throw ConflictException if email exists', async () => {
            authRepository.findUserByEmail.mockResolvedValueOnce({ id: '1' });
            await expect(service.registerTenant({
                email: 'exists@test.com',
                password: 'pw',
                companyName: 'Test',
                firstName: 'A',
                lastName: 'B'
            })).rejects.toThrow(common_1.ConflictException);
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map