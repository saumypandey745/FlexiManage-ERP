import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUUID,
  IsDateString,
  IsBoolean,
  ValidateNested,
} from "class-validator";
import {
  EmployeeStatus,
  AttendanceStatus,
  LeaveStatus,
  PayrollStatus,
  CandidateStatus,
  ShiftType,
} from "@prisma/client";

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  employeeCode!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ enum: EmployeeStatus })
  @IsEnum(EmployeeStatus)
  @IsOptional()
  status?: EmployeeStatus;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class ClockInDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  employeeId!: string;
}

export class ClockOutDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  employeeId!: string;
}

export class CreateLeaveDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  leaveTypeId!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason!: string;
}

export class ApproveLeaveDto {
  @ApiProperty({ enum: LeaveStatus })
  @IsEnum(LeaveStatus)
  @IsNotEmpty()
  status!: LeaveStatus;
}

export class CreatePayrollDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  month!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year!: number;
}
