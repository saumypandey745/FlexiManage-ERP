import { Controller, Get, Post, Param, UseGuards, Req } from "@nestjs/common";
import { WorkflowService } from "../services/workflow.service";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("workflow-executions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("workflow-executions")
export class WorkflowExecutionController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get(":id")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get a workflow execution details" })
  getExecution(@Req() req: any, @Param("id") id: string) {
    return this.workflowService.getExecution(req.user.tenantId, id);
  }

  @Post(":id/stop")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Stop a workflow execution" })
  stopExecution(@Req() req: any, @Param("id") id: string) {
    return this.workflowService.stop(req.user.tenantId, id);
  }
}
