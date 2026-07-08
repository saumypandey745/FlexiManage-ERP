export declare class CreateBranchDto {
    code: string;
    name: string;
    isHeadOffice?: boolean;
    address?: string;
    phone?: string;
    email?: string;
}
declare const UpdateBranchDto_base: import("@nestjs/common").Type<Partial<CreateBranchDto>>;
export declare class UpdateBranchDto extends UpdateBranchDto_base {
}
export {};
