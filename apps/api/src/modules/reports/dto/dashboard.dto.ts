import { IsString, IsOptional, IsEnum, IsBoolean, IsObject, IsInt, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WidgetType {
  CHART = 'CHART',
  TABLE = 'TABLE',
  KPI_CARD = 'KPI_CARD',
  MAP = 'MAP',
  TIMELINE = 'TIMELINE'
}

export enum ChartType {
  BAR = 'BAR',
  LINE = 'LINE',
  PIE = 'PIE',
  DOUGHNUT = 'DOUGHNUT',
  AREA = 'AREA',
  SCATTER = 'SCATTER'
}

export class CreateDashboardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  layout?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateDashboardDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  layout?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class WidgetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: WidgetType })
  @IsEnum(WidgetType)
  type: WidgetType;

  @ApiPropertyOptional({ enum: ChartType })
  @IsEnum(ChartType)
  @IsOptional()
  chartType?: ChartType;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  positionX?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  positionY?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  width?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsObject()
  dataSource: Record<string, any>;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}
