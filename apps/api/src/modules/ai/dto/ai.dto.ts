import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsObject,
  IsArray,
  IsUUID,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum AiProviderCode {
  OPENAI = "OPENAI",
  ANTHROPIC = "ANTHROPIC",
  GEMINI = "GEMINI",
  AZURE = "AZURE",
  OLLAMA = "OLLAMA",
  OPENROUTER = "OPENROUTER",
  DEEPSEEK = "DEEPSEEK",
}

export enum AiConversationStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export class ChatRequestDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  conversationId?: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  templateCode?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  context?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  stream?: boolean;
}

export class CreateTemplateDto {
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

  @ApiProperty()
  @IsString()
  systemPrompt: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userPrompt?: string;
}

export class SemanticSearchDto {
  @ApiProperty()
  @IsString()
  query: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sourceType?: string;
}

export class EmbedDocumentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  sourceType: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sourceId?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class GenerateRequestDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  taskType?: string;
}
