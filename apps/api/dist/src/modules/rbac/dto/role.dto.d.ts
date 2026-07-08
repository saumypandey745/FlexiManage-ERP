export declare class CreateRoleDto {
    name: string;
}
declare const UpdateRoleDto_base: import("@nestjs/common").Type<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
}
export declare class RoleResponseDto {
    id: string;
    name: string;
    tenantId?: string | null;
}
export {};
