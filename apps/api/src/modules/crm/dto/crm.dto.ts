import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsUUID, IsBoolean, IsDateString } from 'class-validator';
import { LeadStatus, OpportunityStage } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: 'john@acme.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '+1-555-1234' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: LeadStatus })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @ApiProperty({ example: 'Website' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}

export class CreateCustomerDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiProperty({ example: 'info@acme.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+1-555-0000' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'https://acme.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  billingAddress?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class CreateContactDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'CTO' })
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({ example: 'jane@acme.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '+1-555-9999' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}

export class CreateOpportunityDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  customerId!: string;

  @ApiProperty({ example: 'Acme Software License Q3' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsOptional()
  probability?: number;

  @ApiProperty({ enum: OpportunityStage })
  @IsEnum(OpportunityStage)
  @IsOptional()
  stage?: OpportunityStage;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expectedClose?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}

export class UpdateOpportunityDto extends PartialType(CreateOpportunityDto) {}
