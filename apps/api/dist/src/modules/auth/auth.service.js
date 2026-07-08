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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon2 = require("argon2");
const crypto = require("crypto");
const auth_repository_1 = require("./auth.repository");
const redis_service_1 = require("../../common/cache/redis.service");
const email_service_1 = require("../email/email.service");
const base_exception_1 = require("../../common/exceptions/base.exception");
let AuthService = class AuthService {
    constructor(authRepository, jwtService, configService, redis, emailService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.redis = redis;
        this.emailService = emailService;
    }
    async registerTenant(dto) {
        const existingUser = await this.authRepository.findUserByEmail(dto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const { user } = await this.authRepository.createTenantWithAdmin(dto);
        const verifyToken = crypto.randomBytes(32).toString('hex');
        await this.redis.set(`verify_token:${verifyToken}`, user.id, 86400);
        await this.emailService.sendWelcomeEmail(user.email, dto.firstName);
        await this.emailService.sendVerifyEmail(user.email, verifyToken);
        return this.generateTokens(user);
    }
    async login(dto, ipAddress) {
        const lockoutKey = `lockout:${dto.email}:${ipAddress}`;
        const attempts = await this.redis.get(lockoutKey) || 0;
        if (attempts >= 5) {
            throw new base_exception_1.BaseException('Account locked due to multiple failed login attempts. Please try again later.', 'AUTH-429', 429);
        }
        const user = await this.authRepository.findUserByEmail(dto.email);
        if (!user || user.status !== 'ACTIVE') {
            await this.redis.set(lockoutKey, attempts + 1, 900);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await argon2.verify(user.passwordHash, dto.password);
        if (!isPasswordValid) {
            await this.redis.set(lockoutKey, attempts + 1, 900);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.redis.del(lockoutKey);
        return this.generateTokens(user);
    }
    async logout(userId, refreshToken) {
        if (refreshToken) {
            await this.redis.set(`revoked_token:${refreshToken}`, '1', 7 * 24 * 60 * 60);
        }
    }
    async refreshTokens(user, oldRefreshToken) {
        await this.redis.set(`revoked_token:${oldRefreshToken}`, '1', 7 * 24 * 60 * 60);
        return this.generateTokens(user);
    }
    async forgotPassword(dto) {
        const user = await this.authRepository.findUserByEmail(dto.email);
        if (user) {
            const resetToken = crypto.randomBytes(32).toString('hex');
            await this.redis.set(`reset_token:${resetToken}`, user.id, 3600);
            await this.emailService.sendForgotPassword(user.email, resetToken);
        }
    }
    async resetPassword(dto) {
        const userId = await this.redis.get(`reset_token:${dto.token}`);
        if (!userId) {
            throw new base_exception_1.BaseException('Invalid or expired password reset token', 'AUTH-400', 400);
        }
        const hashedPassword = await argon2.hash(dto.newPassword);
        await this.authRepository.updateUserPassword(userId, hashedPassword);
        await this.redis.del(`reset_token:${dto.token}`);
    }
    async changePassword(userId, dto) {
        const user = await this.authRepository.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isPasswordValid = await argon2.verify(user.passwordHash, dto.currentPassword);
        if (!isPasswordValid) {
            throw new base_exception_1.BaseException('Invalid current password', 'AUTH-400', 400);
        }
        const hashedPassword = await argon2.hash(dto.newPassword);
        await this.authRepository.updateUserPassword(userId, hashedPassword);
    }
    async verifyEmail(dto) {
        const userId = await this.redis.get(`verify_token:${dto.token}`);
        if (!userId) {
            throw new base_exception_1.BaseException('Invalid or expired verification token', 'AUTH-400', 400);
        }
        await this.authRepository.markEmailAsVerified(userId);
        await this.redis.del(`verify_token:${dto.token}`);
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id || user.sub,
            tenantId: user.tenantId,
            email: user.email,
            roles: user.roles?.map((r) => r.role?.name || r) || [],
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRES_IN'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('REFRESH_SECRET'),
                expiresIn: this.configService.get('REFRESH_EXPIRES_IN'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
            user: {
                id: payload.sub,
                email: payload.email,
                tenantId: payload.tenantId,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        config_1.ConfigService,
        redis_service_1.RedisCacheService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map