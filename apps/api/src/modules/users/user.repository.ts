import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto, UpdatePreferencesDto } from './dto/user.dto';
import { UserStatus } from '@prisma/client';
import { BaseException } from '../../common/exceptions/base.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUsers(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId, deletedAt: null },
      include: { profile: true, preference: true, roles: { include: { role: true } } },
    });
  }

  async findById(tenantId: string, id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, preference: true, roles: { include: { role: true } } },
    });
  }

  async findByEmail(tenantId: string, email: string) {
    return this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
    });
  }

  async createUser(tenantId: string, dto: CreateUserDto) {
    const exists = await this.findByEmail(tenantId, dto.email);
    if (exists) {
      throw new BaseException('Email already in use', 'USER-409', 409);
    }

    return this.prisma.user.create({
      data: {
        tenantId,
        email: dto.email,
        passwordHash: dto.password,
        status: dto.status || UserStatus.INVITED,
        profile: { create: {} },
        preference: { create: {} },
      },
    });
  }

  async updateUser(tenantId: string, id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id, tenantId },
      data: dto,
    });
  }

  async deleteUser(tenantId: string, id: string) {
    return this.prisma.user.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), status: UserStatus.ARCHIVED },
    });
  }

  async updateStatus(tenantId: string, id: string, status: UserStatus) {
    return this.prisma.user.update({
      where: { id, tenantId },
      data: { status },
    });
  }

  async updateProfile(tenantId: string, userId: string, dto: UpdateProfileDto) {
    return this.prisma.userProfile.upsert({
      where: { userId },
      create: { ...dto, userId },
      update: dto,
    });
  }

  async updatePreferences(tenantId: string, userId: string, dto: UpdatePreferencesDto) {
    return this.prisma.userPreference.upsert({
      where: { userId },
      create: { ...dto, userId },
      update: dto,
    });
  }

  async updateAvatar(tenantId: string, userId: string, avatarUrl: string) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: { avatarUrl },
    });
  }
}
