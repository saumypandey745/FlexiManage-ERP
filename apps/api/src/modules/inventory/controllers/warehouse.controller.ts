import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { WarehouseService } from "../services/warehouse.service";
import { CreateWarehouseDto, UpdateWarehouseDto } from "../dto/inventory.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiTags("Inventory Warehouses")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("inventory/warehouses")
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiOperation({ summary: "Create warehouse" })
  @ApiResponse({ status: 201, description: "Warehouse created." })
  create(@Req() req: any, @Body() createDto: CreateWarehouseDto) {
    return this.warehouseService.create(
      req.user.tenantId,
      req.user.id,
      createDto
    );
  }

  @Get()
  @ApiOperation({ summary: "List warehouses" })
  findAll(@Req() req: any) {
    return this.warehouseService.findAll(req.user.tenantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get warehouse" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.warehouseService.findOne(req.user.tenantId, id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update warehouse" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() updateDto: UpdateWarehouseDto
  ) {
    return this.warehouseService.update(
      req.user.tenantId,
      id,
      req.user.id,
      updateDto
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete warehouse" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.warehouseService.delete(req.user.tenantId, id, req.user.id);
  }
}
