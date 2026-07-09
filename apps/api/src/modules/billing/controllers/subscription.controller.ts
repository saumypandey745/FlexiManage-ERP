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
import { SubscriptionService } from "../services/subscription.service";
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from "../dto/billing.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("billing-subscriptions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("billing/subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: "Create a new subscription for tenant" })
  create(@Req() req: any, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(
      req.user.tenantId,
      req.user.id,
      dto
    );
  }

  @Get()
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get current subscription details" })
  get(@Req() req: any) {
    return this.subscriptionService.getSubscription(req.user.tenantId);
  }

  @Patch(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Upgrade or downgrade subscription plan" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateSubscriptionDto
  ) {
    return this.subscriptionService.updateSubscription(
      req.user.tenantId,
      id,
      req.user.id,
      dto
    );
  }
}
