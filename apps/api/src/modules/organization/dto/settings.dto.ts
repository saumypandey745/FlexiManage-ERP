import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class BusinessProfileDto {
  @ApiProperty({ example: "Acme Corporation Inc." })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  legalName!: string;

  @ApiProperty({ example: "contact@acme.com" })
  @IsEmail()
  @IsOptional()
  businessEmail?: string;

  @ApiProperty({ example: "+1-555-1234" })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  phone?: string;

  @ApiProperty({ example: "22AAAAA0000A1Z5" })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  gstNumber?: string;

  @ApiProperty({ example: "ABCDE1234F" })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  panNumber?: string;

  @ApiProperty({ example: "US" })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: "123 Business Avenue" })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brandingColor?: string;
}

export class OrganizationSettingsDto {
  @ApiProperty({ example: "UTC" })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({ example: "USD" })
  @IsString()
  @IsOptional()
  currency?: string;
}
