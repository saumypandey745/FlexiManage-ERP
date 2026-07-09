import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { CurrentUser } from "../../../common/decorators/auth.decorators";
import { OpportunityService } from "../services/opportunity.service";
import { CreateOpportunityDto, UpdateOpportunityDto } from "../dto/crm.dto";
import { OpportunityStage } from "@prisma/client";

@ApiTags("CRM - Opportunities")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("crm/opportunities")
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Get()
  @ApiOperation({ summary: "List Opportunities" })
  async getOpportunities(@CurrentUser() user: any) {
    return this.opportunityService.getOpportunities(user.tenantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Opportunity By ID" })
  async getOpportunity(@CurrentUser() user: any, @Param("id") id: string) {
    return this.opportunityService.getOpportunityById(user.tenantId, id);
  }

  @Post()
  @ApiOperation({ summary: "Create Opportunity" })
  async createOpportunity(
    @CurrentUser() user: any,
    @Body() dto: CreateOpportunityDto
  ) {
    return this.opportunityService.createOpportunity(
      user.tenantId,
      user.id,
      dto
    );
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Opportunity" })
  async updateOpportunity(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateOpportunityDto
  ) {
    return this.opportunityService.updateOpportunity(
      user.tenantId,
      id,
      user.id,
      dto
    );
  }

  @Patch(":id/win")
  @ApiOperation({ summary: "Mark Opportunity as Won" })
  async winOpportunity(@CurrentUser() user: any, @Param("id") id: string) {
    return this.opportunityService.setStage(
      user.tenantId,
      id,
      user.id,
      OpportunityStage.CLOSED_WON
    );
  }

  @Patch(":id/lose")
  @ApiOperation({ summary: "Mark Opportunity as Lost" })
  async loseOpportunity(@CurrentUser() user: any, @Param("id") id: string) {
    return this.opportunityService.setStage(
      user.tenantId,
      id,
      user.id,
      OpportunityStage.CLOSED_LOST
    );
  }
}
