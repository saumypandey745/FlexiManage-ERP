import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { UserSettingsService } from './services/user-settings.service';
import { UserSessionService } from './services/user-session.service';
import { UserActivityService } from './services/user-activity.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto, UpdatePreferencesDto, UploadAvatarDto, DeactivateUserDto } from './dto/user.dto';
import { UserStatus } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    private readonly profileService;
    private readonly settingsService;
    private readonly sessionService;
    private readonly activityService;
    constructor(userService: UserService, profileService: ProfileService, settingsService: UserSettingsService, sessionService: UserSessionService, activityService: UserActivityService);
    updateMyProfile(user: any, dto: UpdateProfileDto): Promise<{
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
    updateMyPreferences(user: any, dto: UpdatePreferencesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        timezone: string;
        notifications: boolean;
        userId: string;
        language: string;
        theme: string;
    }>;
    updateMyAvatar(user: any, dto: UploadAvatarDto): Promise<{
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
    removeMyAvatar(user: any): Promise<{
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
    getMySessions(user: any): Promise<any>;
    revokeSession(user: any, sessionId: string): Promise<void>;
    getMyActivity(user: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: import(".prisma/client").$Enums.ActionType;
        entityName: string;
        entityId: string;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getUsers(user: any): Promise<({
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
    getUser(user: any, id: string): Promise<({
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
    createUser(user: any, dto: CreateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateUser(user: any, id: string, dto: UpdateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    deleteUser(user: any, id: string, _dto: DeactivateUserDto): Promise<{
        status: import(".prisma/client").$Enums.UserStatus;
        email: string;
        id: string;
        tenantId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    changeStatus(user: any, id: string, status: UserStatus): Promise<{
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
