import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'TEAM-FE' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'Frontend Team' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Handles React apps' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'uuid-of-department' })
  @IsUUID()
  @IsOptional()
  departmentId?: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
