import { EmployeeStatus, LeaveStatus } from '@prisma/client';
export declare class CreateEmployeeDto {
    employeeCode: string;
    firstName: string;
    lastName: string;
    status?: EmployeeStatus;
}
declare const UpdateEmployeeDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeDto>>;
export declare class UpdateEmployeeDto extends UpdateEmployeeDto_base {
}
export declare class ClockInDto {
    employeeId: string;
}
export declare class ClockOutDto {
    employeeId: string;
}
export declare class CreateLeaveDto {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    reason: string;
}
export declare class ApproveLeaveDto {
    status: LeaveStatus;
}
export declare class CreatePayrollDto {
    month: number;
    year: number;
}
export {};
