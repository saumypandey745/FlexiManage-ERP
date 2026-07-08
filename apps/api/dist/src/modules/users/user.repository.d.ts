import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto, UpdatePreferencesDto } from './dto/user.dto';
import { UserStatus } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUsers(tenantId: string): Promise<({
        roles: ({
            role: {
                id: string;
                tenantId: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            roleId: string;
            userId: string;
        })[];
        profile: {
            firstName: string | null;
            lastName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            phone: string | null;
            bio: string | null;
            avatarUrl: string | null;
        } | null;
        preference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            timezone: string;
            notifications: boolean;
            userId: string;
            language: string;
            theme: string;
        } | null;
    } & {
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    })[]>;
    findById(tenantId: string, id: string): Promise<({
        roles: ({
            role: {
                id: string;
                tenantId: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            roleId: string;
            userId: string;
        })[];
        profile: {
            firstName: string | null;
            lastName: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            phone: string | null;
            bio: string | null;
            avatarUrl: string | null;
        } | null;
        preference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            timezone: string;
            notifications: boolean;
            userId: string;
            language: string;
            theme: string;
        } | null;
    } & {
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }) | null>;
    findByEmail(tenantId: string, email: string): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | null>;
    createUser(tenantId: string, dto: CreateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateUser(tenantId: string, id: string, dto: UpdateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    deleteUser(tenantId: string, id: string): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateStatus(tenantId: string, id: string, status: UserStatus): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
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
}
