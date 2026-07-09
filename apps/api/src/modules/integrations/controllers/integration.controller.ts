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
import { IntegrationService } from "../services/integration.service";
import {
  ConnectIntegrationDto,
  UpdateIntegrationDto,
} from "../dto/integration.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("integrations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("integrations")
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: "Connect a new integration" })
  connect(@Req() req: any, @Body() dto: ConnectIntegrationDto) {
    return this.integrationService.connect(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "List all integrations" })
  findAll(@Req() req: any) {
    return this.integrationService.getIntegrations(req.user.tenantId);
  }

  @Get(":id")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get integration details" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.integrationService.getIntegration(req.user.tenantId, id);
  }

  @Patch(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Update integration configuration" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateIntegrationDto
  ) {
    return this.integrationService.updateIntegration(
      req.user.tenantId,
      id,
      req.user.id,
      dto
    );
  }

  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Disconnect an integration" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.integrationService.disconnect(
      req.user.tenantId,
      id,
      req.user.id
    );
  }

  @Post(":id/sync")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Trigger a manual sync job" })
  sync(@Req() req: any, @Param("id") id: string) {
    return this.integrationService.sync(req.user.tenantId, id, req.user.id);
  }

  @Get(":id/status")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get integration connection status" })
  async status(@Req() req: any, @Param("id") id: string) {
    const integration = await this.integrationService.getIntegration(
      req.user.tenantId,
      id
    );
    return { status: integration.status };
  }
}
