import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsUUID,
  Min,
} from "class-validator";
import { SprintStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SprintDto {
  @ApiProperty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  goal?: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ enum: SprintStatus })
  @IsEnum(SprintStatus)
  @IsOptional()
  status?: SprintStatus;
}

export class MilestoneDto {
  @ApiProperty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDateString()
  dueDate: string;
}

export class TimeEntryDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  taskId?: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.1)
  hours: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
