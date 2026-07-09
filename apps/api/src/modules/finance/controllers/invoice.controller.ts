import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { InvoiceService } from "../services/invoice.service";
import { CreateInvoiceDto } from "../dto/finance.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("Finance Invoices")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("finance/invoices")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: "Create Invoice" })
  create(@Req() req: any, @Body() createDto: CreateInvoiceDto) {
    return this.invoiceService.create(
      req.user.tenantId,
      req.user.id,
      createDto
    );
  }

  @Get()
  @ApiOperation({ summary: "List Invoices" })
  findAll(@Req() req: any) {
    return this.invoiceService.findAll(req.user.tenantId);
  }

  @Patch(":id/send")
  @ApiOperation({ summary: "Send Invoice" })
  send(@Req() req: any, @Param("id") id: string) {
    return this.invoiceService.send(req.user.tenantId, id, req.user.id);
  }
}
