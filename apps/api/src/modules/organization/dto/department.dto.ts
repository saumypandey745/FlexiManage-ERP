import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({ example: "DEP-ENG" })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: "Engineering" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: "Software Engineering Department" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "uuid-of-branch" })
  @IsUUID()
  @IsOptional()
  branchId?: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
