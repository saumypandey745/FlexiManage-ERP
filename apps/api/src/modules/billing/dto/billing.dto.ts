import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUUID,
  IsArray,
  IsObject,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsUUID()
  planId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  couponCode?: string;
}

export class UpdateSubscriptionDto {
  @ApiProperty()
  @IsUUID()
  planId: string;
}

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  provider: string; // STRIPE, RAZORPAY
}

export class CreateCouponDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  discountType: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  discountValue: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  maxUses?: number;
}
