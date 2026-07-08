import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';
import { WarehouseStatus, MovementType, POStatus } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  uom?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  reorderLevel?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  safetyStock?: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class CreateWarehouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ enum: WarehouseStatus })
  @IsEnum(WarehouseStatus)
  @IsOptional()
  status?: WarehouseStatus;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  managerId?: string;
}

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {}

export class StockMovementDto {
  @ApiProperty({ enum: MovementType })
  @IsEnum(MovementType)
  @IsNotEmpty()
  type!: MovementType;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  fromWarehouseId?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  toWarehouseId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreatePurchaseOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  poNumber!: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  supplierId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalAmount!: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expectedDate?: string;
}

export class ReceivePurchaseOrderDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
}
