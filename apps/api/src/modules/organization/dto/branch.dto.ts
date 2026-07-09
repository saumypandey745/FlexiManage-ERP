import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBranchDto {
  @ApiProperty({ example: "BR-001" })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: "New York HQ" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isHeadOffice?: boolean;

  @ApiProperty({ example: "123 Broadway, NY" })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: "+1234567890" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: "ny@acme.com" })
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
