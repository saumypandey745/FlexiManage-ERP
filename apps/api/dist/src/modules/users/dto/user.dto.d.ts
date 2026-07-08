import { UserStatus } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    status?: UserStatus;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
}
export declare class UpdatePreferencesDto {
    timezone?: string;
    language?: string;
    theme?: string;
    notifications?: boolean;
}
export declare class ChangeEmailDto {
    newEmail: string;
}
export declare class UploadAvatarDto {
    avatarUrl: string;
}
export declare class DeactivateUserDto {
    reason?: string;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    status: UserStatus;
}
export {};
