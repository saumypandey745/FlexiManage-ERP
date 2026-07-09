import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from "@nestjs/common";
import { WorkflowService } from "../services/workflow.service";
import {
  CreateWorkflowDto,
  UpdateWorkflowDto,
  CreateWorkflowNodeDto,
  CreateWorkflowEdgeDto,
  TriggerWorkflowDto,
} from "../dto/workflow.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("workflows")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("workflows")
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: "Create a new workflow" })
  create(@Req() req: any, @Body() dto: CreateWorkflowDto) {
    return this.workflowService.create(req.user.tenantId, dto);
  }

  @Get()
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get all workflows" })
  findAll(
    @Req() req: any,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    return this.workflowService.findAll(
      req.user.tenantId,
      +(page || 1),
      +(limit || 10)
    );
  }

  @Get(":id")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Get a workflow by id" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.workflowService.findOne(req.user.tenantId, id);
  }

  @Patch(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Update a workflow" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateWorkflowDto,
    @Query("version") version: string
  ) {
    return this.workflowService.update(
      req.user.tenantId,
      id,
      dto,
      +(version || 1)
    );
  }

  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Delete a workflow" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.workflowService.delete(req.user.tenantId, id);
  }

  @Post(":id/nodes")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Add a node to workflow" })
  addNode(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: CreateWorkflowNodeDto
  ) {
    return this.workflowService.addNode(req.user.tenantId, id, dto);
  }

  @Post(":id/edges")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Add an edge to workflow" })
  addEdge(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: CreateWorkflowEdgeDto
  ) {
    return this.workflowService.addEdge(req.user.tenantId, id, dto);
  }

  @Post(":id/publish")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Publish a workflow" })
  publish(
    @Req() req: any,
    @Param("id") id: string,
    @Query("version") version: string
  ) {
    return this.workflowService.publish(req.user.tenantId, id, +(version || 1));
  }

  @Post(":id/run")
  @Roles("ADMIN", "MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Trigger a workflow execution" })
  run(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: TriggerWorkflowDto
  ) {
    return this.workflowService.run(req.user.tenantId, id, dto.triggerData);
  }
}
