import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UpdateProfileDto } from '../dto/user.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly repo: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async updateProfile(tenantId: string, userId: string, dto: UpdateProfileDto) {
    const profile = await this.repo.updateProfile(tenantId, userId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'UserProfile',
        entityId: profile.id,
        newValues: dto as any,
      },
    });

    return profile;
  }

  async updateAvatar(tenantId: string, userId: string, avatarUrl: string) {
    const profile = await this.repo.updateAvatar(tenantId, userId, avatarUrl);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'UserAvatar',
        entityId: profile.id,
        newValues: { avatarUrl } as any,
      },
    });

    return profile;
  }

  async removeAvatar(tenantId: string, userId: string) {
    // We treat empty string or null as removing avatar
    return this.updateAvatar(tenantId, userId, '');
  }
}
