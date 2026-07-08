import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import { RedisCacheService } from '../../common/cache/redis.service';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dto/login.dto';
import { RegisterTenantDto } from './dto/register.dto';
import { ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from './dto/password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly redis;
    private readonly emailService;
    constructor(authRepository: AuthRepository, jwtService: JwtService, configService: ConfigService, redis: RedisCacheService, emailService: EmailService);
    registerTenant(dto: RegisterTenantDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            tenantId: any;
        };
    }>;
    login(dto: LoginDto, ipAddress: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            tenantId: any;
        };
    }>;
    logout(userId: string, refreshToken?: string): Promise<void>;
    refreshTokens(user: any, oldRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            tenantId: any;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
    verifyEmail(dto: VerifyEmailDto): Promise<void>;
    private generateTokens;
}
