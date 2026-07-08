import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/finance.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Finance Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('finance/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Record Payment' })
  create(@Req() req: any, @Body() createDto: CreatePaymentDto) {
    return this.paymentService.create(req.user.tenantId, req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Payments' })
  findAll(@Req() req: any) {
    return this.paymentService.findAll(req.user.tenantId);
  }
}
