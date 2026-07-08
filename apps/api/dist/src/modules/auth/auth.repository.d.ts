import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterTenantDto } from './dto/register.dto';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<({
        tenant: {
            status: import(".prisma/client").$Enums.TenantStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            subscription: import(".prisma/client").$Enums.SubscriptionPlan;
            timezone: string;
            currency: string;
        };
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
    findById(id: string): Promise<({
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
    createTenantWithAdmin(dto: RegisterTenantDto): Promise<{
        tenant: {
            status: import(".prisma/client").$Enums.TenantStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            subscription: import(".prisma/client").$Enums.SubscriptionPlan;
            timezone: string;
            currency: string;
        };
        user: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    updateUserPassword(userId: string, passwordHash: string): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    markEmailAsVerified(userId: string): Promise<{
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
