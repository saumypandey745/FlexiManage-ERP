import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsBoolean,
  IsArray,
} from "class-validator";
import { MessageType, WebhookStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateChatRoomDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsBoolean()
  isGroup: boolean;

  @ApiProperty()
  @IsArray()
  @IsUUID("4", { each: true })
  participantIds: string[];
}

export class SendMessageDto {
  @ApiProperty()
  @IsUUID()
  roomId: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ enum: MessageType })
  @IsEnum(MessageType)
  @IsOptional()
  type?: MessageType;
}

export class UpdatePreferenceDto {
  @ApiProperty()
  @IsBoolean()
  emailEnabled: boolean;

  @ApiProperty()
  @IsBoolean()
  smsEnabled: boolean;

  @ApiProperty()
  @IsBoolean()
  pushEnabled: boolean;

  @ApiProperty()
  @IsBoolean()
  inAppEnabled: boolean;
}

export class WebhookDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  secret?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  events: string[];

  @ApiPropertyOptional({ enum: WebhookStatus })
  @IsEnum(WebhookStatus)
  @IsOptional()
  status?: WebhookStatus;
}
