import { UserRepository } from '../user.repository';
import { UpdateProfileDto } from '../dto/user.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ProfileService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: UserRepository, prisma: PrismaService);
    updateProfile(tenantId: string, userId: string, dto: UpdateProfileDto): Promise<{
        firstName: string | null;
        lastName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
    }>;
    updateAvatar(tenantId: string, userId: string, avatarUrl: string): Promise<{
        firstName: string | null;
        lastName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
    }>;
    removeAvatar(tenantId: string, userId: string): Promise<{
        firstName: string | null;
        lastName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
    }>;
}
