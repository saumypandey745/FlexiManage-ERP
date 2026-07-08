import { UserRepository } from '../user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class UserService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: UserRepository, prisma: PrismaService);
    getUsers(tenantId: string): Promise<({
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
    getUserById(tenantId: string, id: string): Promise<({
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
    createUser(tenantId: string, actionUserId: string, dto: CreateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateUser(tenantId: string, id: string, actionUserId: string, dto: UpdateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    deleteUser(tenantId: string, id: string, actionUserId: string): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    changeStatus(tenantId: string, id: string, actionUserId: string, status: UserStatus): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
