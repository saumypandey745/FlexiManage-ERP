import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TenantStatus, SubscriptionPlan } from "@prisma/client";

export class CreateTenantDto {
  @ApiProperty({ example: "Acme Corp" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: TenantStatus, default: TenantStatus.TRIAL })
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @ApiProperty({ enum: SubscriptionPlan, default: SubscriptionPlan.FREE })
  @IsEnum(SubscriptionPlan)
  subscription?: SubscriptionPlan;

  @ApiProperty({ example: "UTC" })
  @IsString()
  timezone?: string;

  @ApiProperty({ example: "USD" })
  @IsString()
  currency?: string;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
