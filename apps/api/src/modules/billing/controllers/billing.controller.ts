import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BillingService } from '../services/billing.service';
import { SubscriptionService } from '../services/subscription.service';
import { CreatePaymentDto, CreateCouponDto } from '../dto/billing.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @Get('plans')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'List all available SaaS plans' })
  getPlans() {
    return this.subscriptionService.getPlans();
  }

  @Get('invoices')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'List all invoices' })
  getInvoices(@Req() req: any) {
    return this.billingService.getInvoices(req.user.tenantId);
  }

  @Get('invoices/:id')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get invoice details' })
  getInvoice(@Req() req: any, @Param('id') id: string) {
    return this.billingService.getInvoice(req.user.tenantId, id);
  }

  @Post('payments')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Process a payment for an invoice' })
  processPayment(@Req() req: any, @Body() dto: CreatePaymentDto) {
    return this.billingService.processPayment(req.user.tenantId, req.user.id, dto);
  }

  @Get('usage')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get current metered usage' })
  getUsage(@Req() req: any) {
    return this.billingService.getUsage(req.user.tenantId);
  }

  @Post('coupons')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a billing coupon' })
  createCoupon(@Req() req: any, @Body() dto: CreateCouponDto) {
    return this.billingService.createCoupon(req.user.tenantId, dto);
  }
}
