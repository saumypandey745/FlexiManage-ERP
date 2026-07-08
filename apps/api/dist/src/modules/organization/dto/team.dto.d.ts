export declare class CreateTeamDto {
    code: string;
    name: string;
    description?: string;
    departmentId?: string;
}
declare const UpdateTeamDto_base: import("@nestjs/common").Type<Partial<CreateTeamDto>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
}
export {};
