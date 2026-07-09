import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
  IsObject,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConnectIntegrationDto {
  @ApiProperty()
  @IsString()
  provider: string; // e.g. STRIPE, GOOGLE, SLACK

  @ApiProperty()
  @IsString()
  category: string; // e.g. PAYMENT, CALENDAR

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  credentials?: Record<string, string>;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;
}

export class UpdateIntegrationDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;
}

export class WebhookEndpointDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString({ each: true })
  events: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  secret?: string;
}
