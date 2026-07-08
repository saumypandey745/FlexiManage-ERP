import { IsString, IsOptional, IsEnum, IsBoolean, IsObject, IsArray, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum WorkflowNodeType {
  TRIGGER = 'TRIGGER',
  ACTION = 'ACTION',
  CONDITION = 'CONDITION',
  PARALLEL = 'PARALLEL',
  APPROVAL = 'APPROVAL',
  WAIT = 'WAIT'
}

export enum WorkflowExecutionStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED'
}

export class CreateWorkflowDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateWorkflowDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: WorkflowStatus })
  @IsEnum(WorkflowStatus)
  @IsOptional()
  status?: WorkflowStatus;
}

export class CreateWorkflowNodeDto {
  @ApiProperty({ enum: WorkflowNodeType })
  @IsEnum(WorkflowNodeType)
  type: WorkflowNodeType;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  positionX?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  positionY?: number;
}

export class CreateWorkflowEdgeDto {
  @ApiProperty()
  @IsUUID()
  sourceId: string;

  @ApiProperty()
  @IsUUID()
  targetId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  condition?: string;
}

export class TriggerWorkflowDto {
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  triggerData?: Record<string, any>;
}
