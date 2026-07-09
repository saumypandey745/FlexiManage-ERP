import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsBoolean,
  IsObject,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum ReportType {
  STANDARD = "STANDARD",
  CUSTOM = "CUSTOM",
  FINANCIAL = "FINANCIAL",
  HR = "HR",
  PROJECT = "PROJECT",
  CRM = "CRM",
  INVENTORY = "INVENTORY",
}

export enum ReportStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum ExportFormat {
  CSV = "CSV",
  EXCEL = "EXCEL",
  PDF = "PDF",
  JSON = "JSON",
}

export enum ScheduleFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
}

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ReportType })
  @IsEnum(ReportType)
  type: ReportType;

  @ApiProperty()
  @IsObject()
  queryConfig: Record<string, any>;

  @ApiProperty()
  @IsObject()
  columns: Record<string, any>;
}

export class UpdateReportDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: ReportStatus })
  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  queryConfig?: Record<string, any>;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  columns?: Record<string, any>;
}

export class GenerateReportDto {
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  filters?: Record<string, any>;
}

export class ScheduleReportDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ScheduleFrequency })
  @IsEnum(ScheduleFrequency)
  frequency: ScheduleFrequency;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cronExpression?: string;

  @ApiProperty({ enum: ExportFormat })
  @IsEnum(ExportFormat)
  exportFormat: ExportFormat;

  @ApiProperty()
  @IsObject()
  recipients: Record<string, any>;
}

export class ExportDto {
  @ApiProperty({ enum: ExportFormat })
  @IsEnum(ExportFormat)
  format: ExportFormat;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  filters?: Record<string, any>;
}
