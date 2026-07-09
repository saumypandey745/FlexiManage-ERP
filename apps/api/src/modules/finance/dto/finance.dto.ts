import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUUID,
  IsDateString,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { PaymentStatus, ExpenseStatus } from "@prisma/client";

export class InvoiceLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unitPrice!: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  taxRateId?: string;
}

export class CreateInvoiceDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceNumber!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  issueDate!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dueDate!: string;

  @ApiProperty({ type: [InvoiceLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceLineDto)
  lines!: InvoiceLineDto[];
}

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  invoiceId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  method!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  paymentDate!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reference?: string;
}

export class CreateExpenseDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class JournalLineDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  debit?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  credit?: number;
}

export class CreateJournalEntryDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  entryDate!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: [JournalLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JournalLineDto)
  lines!: JournalLineDto[];
}
