import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsObject,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum MetricType {
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  USER_COUNT = "USER_COUNT",
  RETENTION = "RETENTION",
  CONVERSION = "CONVERSION",
  PERFORMANCE = "PERFORMANCE",
  OTHER = "OTHER",
}

export enum AggregationType {
  SUM = "SUM",
  COUNT = "COUNT",
  AVERAGE = "AVERAGE",
  MIN = "MIN",
  MAX = "MAX",
}

export class KpiDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ enum: MetricType })
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty({ enum: AggregationType })
  @IsEnum(AggregationType)
  aggregation: AggregationType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateKpiSnapshotDto {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  dimensions?: Record<string, any>;
}
