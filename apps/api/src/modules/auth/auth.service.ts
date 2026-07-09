import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import * as crypto from "crypto";
import { AuthRepository } from "./auth.repository";
import { RedisCacheService } from "../../common/cache/redis.service";
import { EmailService } from "../email/email.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterTenantDto } from "./dto/register.dto";
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from "./dto/password.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { BaseException } from "../../common/exceptions/base.exception";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redis: RedisCacheService,
    private readonly emailService: EmailService
  ) {}

  async registerTenant(dto: RegisterTenantDto) {
    const existingUser = await this.authRepository.findUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const { user } = await this.authRepository.createTenantWithAdmin(dto);

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    await this.redis.set(`verify_token:${verifyToken}`, user.id, 86400); // 24 hours

    await this.emailService.sendWelcomeEmail(user.email, dto.firstName);
    await this.emailService.sendVerifyEmail(user.email, verifyToken);

    return this.generateTokens(user);
  }

  async login(dto: LoginDto, ipAddress: string) {
    const lockoutKey = `lockout:${dto.email}:${ipAddress}`;
    const attempts = (await this.redis.get<number>(lockoutKey)) || 0;

    if (attempts >= 5) {
      throw new BaseException(
        "Account locked due to multiple failed login attempts. Please try again later.",
        "AUTH-429",
        429
      );
    }

    const user = await this.authRepository.findUserByEmail(dto.email);
    if (!user || user.status !== "ACTIVE") {
      await this.redis.set(lockoutKey, attempts + 1, 900);
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      dto.password
    );
    if (!isPasswordValid) {
      await this.redis.set(lockoutKey, attempts + 1, 900);
      throw new UnauthorizedException("Invalid credentials");
    }

    await this.redis.del(lockoutKey);
    return this.generateTokens(user);
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.redis.set(
        `revoked_token:${refreshToken}`,
        "1",
        7 * 24 * 60 * 60
      );
    }
  }

  async refreshTokens(user: any, oldRefreshToken: string) {
    await this.redis.set(
      `revoked_token:${oldRefreshToken}`,
      "1",
      7 * 24 * 60 * 60
    );
    return this.generateTokens(user);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.authRepository.findUserByEmail(dto.email);
    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      await this.redis.set(`reset_token:${resetToken}`, user.id, 3600); // 1 hour
      await this.emailService.sendForgotPassword(user.email, resetToken);
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const userId = await this.redis.get<string>(`reset_token:${dto.token}`);
    if (!userId) {
      throw new BaseException(
        "Invalid or expired password reset token",
        "AUTH-400",
        400
      );
    }

    const hashedPassword = await argon2.hash(dto.newPassword);
    await this.authRepository.updateUserPassword(userId, hashedPassword);
    await this.redis.del(`reset_token:${dto.token}`);

    // Optional: fetch user to get email for success notification
    // const user = await this.authRepository.findById(userId);
    // await this.emailService.sendPasswordResetSuccess(user.email);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new UnauthorizedException("User not found");

    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      dto.currentPassword
    );
    if (!isPasswordValid) {
      throw new BaseException("Invalid current password", "AUTH-400", 400);
    }

    const hashedPassword = await argon2.hash(dto.newPassword);
    await this.authRepository.updateUserPassword(userId, hashedPassword);
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const userId = await this.redis.get<string>(`verify_token:${dto.token}`);
    if (!userId) {
      throw new BaseException(
        "Invalid or expired verification token",
        "AUTH-400",
        400
      );
    }

    await this.authRepository.markEmailAsVerified(userId);
    await this.redis.del(`verify_token:${dto.token}`);
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id || user.sub,
      tenantId: user.tenantId,
      email: user.email,
      roles: user.roles?.map((r: any) => r.role?.name || r) || [],
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_SECRET"),
        expiresIn: this.configService.get<string>("JWT_EXPIRES_IN") as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("REFRESH_SECRET"),
        expiresIn: this.configService.get<string>("REFRESH_EXPIRES_IN") as any,
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
}
