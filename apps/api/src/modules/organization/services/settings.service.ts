import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../organization.repository';
import { BusinessProfileDto, OrganizationSettingsDto } from '../dto/settings.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(
    private readonly repo: OrganizationRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getOrganizationInfo(tenantId: string) {
    return this.repo.getTenantInfo(tenantId);
  }

  async updateSettings(tenantId: string, userId: string, dto: OrganizationSettingsDto) {
    const tenant = await this.repo.updateTenantSettings(tenantId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'TenantSettings',
        entityId: tenant.id,
        newValues: dto as any,
      },
    });

    return tenant;
  }

  async updateBusinessProfile(tenantId: string, userId: string, dto: BusinessProfileDto) {
    const profile = await this.repo.upsertBusinessProfile(tenantId, dto);
    
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: 'UPDATE',
        entityName: 'OrganizationProfile',
        entityId: profile.id,
        newValues: dto as any,
      },
    });

    return profile;
  }
}
