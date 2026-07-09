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
import { ProjectService } from "../services/project.service";
import { CreateProjectDto, UpdateProjectDto } from "../dto/project.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("projects")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles("ADMIN", "PROJECT_MANAGER")
  @ApiOperation({ summary: "Create a new project" })
  create(@Req() req: any, @Body() dto: CreateProjectDto) {
    return this.projectService.create(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles("ADMIN", "PROJECT_MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Get all projects" })
  findAll(
    @Req() req: any,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    return this.projectService.findAll(
      req.user.tenantId,
      +(page || 1),
      +(limit || 10)
    );
  }

  @Get(":id")
  @Roles("ADMIN", "PROJECT_MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Get a project by ID" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.projectService.findOne(req.user.tenantId, id);
  }

  @Patch(":id")
  @Roles("ADMIN", "PROJECT_MANAGER")
  @ApiOperation({ summary: "Update a project" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateProjectDto
  ) {
    return this.projectService.update(req.user.tenantId, req.user.id, id, dto);
  }

  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Delete a project" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.projectService.remove(req.user.tenantId, req.user.id, id);
  }
}
