import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { UpdatePreferencesDto } from "../dto/user.dto";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class UserSettingsService {
  constructor(
    private readonly repo: UserRepository,
    private readonly prisma: PrismaService
  ) {}

  async updatePreferences(
    tenantId: string,
    userId: string,
    dto: UpdatePreferencesDto
  ) {
    const prefs = await this.repo.updatePreferences(tenantId, userId, dto);

    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action: "UPDATE",
        entityName: "UserPreference",
        entityId: prefs.id,
        newValues: dto as any,
      },
    });

    return prefs;
  }
}
