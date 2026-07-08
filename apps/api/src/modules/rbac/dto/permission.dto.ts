import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'employee:create' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z_]+:[a-z_]+$/, { message: 'Permission must follow module:action format' })
  action!: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

export class PermissionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  action!: string;
}
