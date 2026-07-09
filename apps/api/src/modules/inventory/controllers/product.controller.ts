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
import { ProductService } from "../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../dto/inventory.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiTags("Inventory Products")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("inventory/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({ status: 201, description: "Product created." })
  create(@Req() req: any, @Body() createDto: CreateProductDto) {
    return this.productService.create(
      req.user.tenantId,
      req.user.id,
      createDto
    );
  }

  @Get()
  @ApiOperation({ summary: "List all products" })
  findAll(@Req() req: any) {
    return this.productService.findAll(req.user.tenantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.productService.findOne(req.user.tenantId, id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update product" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() updateDto: UpdateProductDto
  ) {
    return this.productService.update(
      req.user.tenantId,
      id,
      req.user.id,
      updateDto
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.productService.delete(req.user.tenantId, id, req.user.id);
  }
}
