import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { CreatePurchaseOrderDto, ReceivePurchaseOrderDto } from '../dto/inventory.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Inventory Purchase Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('inventory/purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create Purchase Order' })
  create(@Req() req: any, @Body() createDto: CreatePurchaseOrderDto) {
    return this.poService.create(req.user.tenantId, req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Purchase Orders' })
  findAll(@Req() req: any) {
    return this.poService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get PO by ID' })
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.poService.findOne(req.user.tenantId, id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve PO' })
  approve(@Req() req: any, @Param('id') id: string) {
    return this.poService.approve(req.user.tenantId, id, req.user.id);
  }

  @Patch(':id/receive')
  @ApiOperation({ summary: 'Receive items against PO' })
  receive(@Req() req: any, @Param('id') id: string, @Body() dto: ReceivePurchaseOrderDto) {
    return this.poService.receive(req.user.tenantId, id, req.user.id, dto);
  }
}
