import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { CurrentUser } from "../../../common/decorators/auth.decorators";
import { CustomerService } from "../services/customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "../dto/crm.dto";

@ApiTags("CRM - Customers")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("crm/customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: "List Customers" })
  async getCustomers(@CurrentUser() user: any) {
    return this.customerService.getCustomers(user.tenantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Customer By ID" })
  async getCustomer(@CurrentUser() user: any, @Param("id") id: string) {
    return this.customerService.getCustomerById(user.tenantId, id);
  }

  @Post()
  @ApiOperation({ summary: "Create Customer" })
  async createCustomer(
    @CurrentUser() user: any,
    @Body() dto: CreateCustomerDto
  ) {
    return this.customerService.createCustomer(user.tenantId, user.id, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Customer" })
  async updateCustomer(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateCustomerDto
  ) {
    return this.customerService.updateCustomer(user.tenantId, id, user.id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Customer" })
  async deleteCustomer(@CurrentUser() user: any, @Param("id") id: string) {
    return this.customerService.deleteCustomer(user.tenantId, id, user.id);
  }
}
