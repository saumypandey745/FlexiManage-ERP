import { UserRepository } from '../user.repository';
import { UpdatePreferencesDto } from '../dto/user.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class UserSettingsService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: UserRepository, prisma: PrismaService);
    updatePreferences(tenantId: string, userId: string, dto: UpdatePreferencesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        timezone: string;
        notifications: boolean;
        userId: string;
        language: string;
        theme: string;
    }>;
}
