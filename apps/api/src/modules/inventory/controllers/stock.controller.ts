import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { StockService } from "../services/stock.service";
import { StockMovementDto } from "../dto/inventory.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { MovementType } from "@prisma/client";

@ApiTags("Inventory Stock")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("inventory/stock")
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get("movements")
  @ApiOperation({ summary: "Get all stock movements" })
  getMovements(@Req() req: any) {
    return this.stockService.getMovements(req.user.tenantId);
  }

  @Post("in")
  @ApiOperation({ summary: "Stock In" })
  stockIn(@Req() req: any, @Body() dto: StockMovementDto) {
    dto.type = MovementType.IN;
    return this.stockService.processMovement(
      req.user.tenantId,
      req.user.id,
      dto
    );
  }

  @Post("out")
  @ApiOperation({ summary: "Stock Out" })
  stockOut(@Req() req: any, @Body() dto: StockMovementDto) {
    dto.type = MovementType.OUT;
    return this.stockService.processMovement(
      req.user.tenantId,
      req.user.id,
      dto
    );
  }

  @Post("transfer")
  @ApiOperation({ summary: "Stock Transfer" })
  stockTransfer(@Req() req: any, @Body() dto: StockMovementDto) {
    dto.type = MovementType.TRANSFER;
    return this.stockService.processMovement(
      req.user.tenantId,
      req.user.id,
      dto
    );
  }
}
