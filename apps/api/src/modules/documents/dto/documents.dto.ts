import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
  IsNumber,
  IsArray,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum DocumentStatus {
  ACTIVE = "ACTIVE",
  QUARANTINED = "QUARANTINED",
  ARCHIVED = "ARCHIVED",
}

export enum DocumentPermissionType {
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
}

export class CreateFolderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}

export class UpdateFolderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}

export class UploadDocumentDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  folderId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class UpdateDocumentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  folderId?: string;
}

export class ShareDocumentDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  sharedWithId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sharedWithEmail?: string;

  @ApiProperty({ enum: DocumentPermissionType })
  @IsEnum(DocumentPermissionType)
  permission: DocumentPermissionType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  expiresAt?: string;
}

export class SearchDocumentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  folderId?: string;

  @ApiPropertyOptional({ isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
