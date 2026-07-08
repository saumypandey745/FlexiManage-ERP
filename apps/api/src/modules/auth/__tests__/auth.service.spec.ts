import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthRepository } from '../auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../../../common/cache/redis.service';
import { EmailService } from '../../email/email.service';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';

jest.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<Partial<AuthRepository>>;
  let redisCacheService: jest.Mocked<Partial<RedisCacheService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;
  let emailService: jest.Mocked<Partial<EmailService>>;

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: authRepository },
        { provide: RedisCacheService, useValue: redisCacheService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: EmailService, useValue: emailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should throw exception if account is locked out', async () => {
      (redisCacheService.get as jest.Mock).mockResolvedValueOnce(5); // 5 attempts
      await expect(service.login({ email: 'test@test.com', password: 'pw' }, '127.0.0.1'))
        .rejects
        .toThrow('Account locked due to multiple failed login attempts');
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      (redisCacheService.get as jest.Mock).mockResolvedValueOnce(0);
      (authRepository.findUserByEmail as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.login({ email: 'wrong@test.com', password: 'pw' }, '127.0.0.1'))
        .rejects
        .toThrow(UnauthorizedException);
      expect(redisCacheService.set).toHaveBeenCalled(); // increments lockout counter
    });

    it('should return tokens on valid login', async () => {
      const mockUser = {
        id: '1',
        tenantId: 't1',
        email: 'admin@test.com',
        status: 'ACTIVE',
        passwordHash: 'hashedPw',
      };
      
      (redisCacheService.get as jest.Mock).mockResolvedValueOnce(0);
      (authRepository.findUserByEmail as jest.Mock).mockResolvedValueOnce(mockUser as any);
      (argon2.verify as jest.Mock).mockResolvedValueOnce(true);

      const result = await service.login({ email: 'admin@test.com', password: 'pw' }, '127.0.0.1');

      expect(result.accessToken).toBe('mockToken');
      expect(result.refreshToken).toBe('mockToken');
      expect(redisCacheService.del).toHaveBeenCalled(); // resets lockout counter
    });
  });

  describe('registerTenant', () => {
    it('should throw ConflictException if email exists', async () => {
      (authRepository.findUserByEmail as jest.Mock).mockResolvedValueOnce({ id: '1' } as any);

      await expect(service.registerTenant({ 
        email: 'exists@test.com', 
        password: 'pw', 
        companyName: 'Test', 
        firstName: 'A', 
        lastName: 'B' 
      })).rejects.toThrow(ConflictException);
    });
  });
});
