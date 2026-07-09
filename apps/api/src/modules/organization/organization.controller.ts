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
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { CurrentUser } from "../../common/decorators/auth.decorators";
import { BranchService } from "./services/branch.service";
import { DepartmentService } from "./services/department.service";
import { TeamService } from "./services/team.service";
import { SettingsService } from "./services/settings.service";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto/department.dto";
import { CreateTeamDto, UpdateTeamDto } from "./dto/team.dto";
import {
  BusinessProfileDto,
  OrganizationSettingsDto,
} from "./dto/settings.dto";

@ApiTags("Organization")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("organization")
export class OrganizationController {
  constructor(
    private readonly branchService: BranchService,
    private readonly departmentService: DepartmentService,
    private readonly teamService: TeamService,
    private readonly settingsService: SettingsService
  ) {}

  // ----------------------------------------------------
  // SETTINGS & PROFILE
  // ----------------------------------------------------
  @Get()
  @ApiOperation({ summary: "Get Organization/Tenant profile info" })
  async getOrganizationInfo(@CurrentUser() user: any) {
    return this.settingsService.getOrganizationInfo(user.tenantId);
  }

  @Patch("settings")
  @ApiOperation({
    summary: "Update Organization Settings (Timezone, Currency)",
  })
  async updateSettings(
    @CurrentUser() user: any,
    @Body() dto: OrganizationSettingsDto
  ) {
    return this.settingsService.updateSettings(user.tenantId, user.id, dto);
  }

  @Patch("profile")
  @ApiOperation({ summary: "Update Business Profile (GST, PAN, Address)" })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() dto: BusinessProfileDto
  ) {
    return this.settingsService.updateBusinessProfile(
      user.tenantId,
      user.id,
      dto
    );
  }

  // ----------------------------------------------------
  // BRANCHES
  // ----------------------------------------------------
  @Get("branches")
  @ApiOperation({ summary: "List Branches" })
  async getBranches(@CurrentUser() user: any) {
    return this.branchService.getBranches(user.tenantId);
  }

  @Post("branches")
  @ApiOperation({ summary: "Create Branch" })
  async createBranch(@CurrentUser() user: any, @Body() dto: CreateBranchDto) {
    return this.branchService.createBranch(user.tenantId, user.id, dto);
  }

  @Patch("branches/:id")
  @ApiOperation({ summary: "Update Branch" })
  async updateBranch(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateBranchDto
  ) {
    return this.branchService.updateBranch(user.tenantId, id, user.id, dto);
  }

  @Delete("branches/:id")
  @ApiOperation({ summary: "Delete Branch (Soft)" })
  async deleteBranch(@CurrentUser() user: any, @Param("id") id: string) {
    return this.branchService.deleteBranch(user.tenantId, id, user.id);
  }

  // ----------------------------------------------------
  // DEPARTMENTS
  // ----------------------------------------------------
  @Get("departments")
  @ApiOperation({ summary: "List Departments" })
  async getDepartments(@CurrentUser() user: any) {
    return this.departmentService.getDepartments(user.tenantId);
  }

  @Post("departments")
  @ApiOperation({ summary: "Create Department" })
  async createDepartment(
    @CurrentUser() user: any,
    @Body() dto: CreateDepartmentDto
  ) {
    return this.departmentService.createDepartment(user.tenantId, user.id, dto);
  }

  @Patch("departments/:id")
  @ApiOperation({ summary: "Update Department" })
  async updateDepartment(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateDepartmentDto
  ) {
    return this.departmentService.updateDepartment(
      user.tenantId,
      id,
      user.id,
      dto
    );
  }

  @Delete("departments/:id")
  @ApiOperation({ summary: "Delete Department (Soft)" })
  async deleteDepartment(@CurrentUser() user: any, @Param("id") id: string) {
    return this.departmentService.deleteDepartment(user.tenantId, id, user.id);
  }

  // ----------------------------------------------------
  // TEAMS
  // ----------------------------------------------------
  @Get("teams")
  @ApiOperation({ summary: "List Teams" })
  async getTeams(@CurrentUser() user: any) {
    return this.teamService.getTeams(user.tenantId);
  }

  @Post("teams")
  @ApiOperation({ summary: "Create Team" })
  async createTeam(@CurrentUser() user: any, @Body() dto: CreateTeamDto) {
    return this.teamService.createTeam(user.tenantId, user.id, dto);
  }

  @Patch("teams/:id")
  @ApiOperation({ summary: "Update Team" })
  async updateTeam(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateTeamDto
  ) {
    return this.teamService.updateTeam(user.tenantId, id, user.id, dto);
  }

  @Delete("teams/:id")
  @ApiOperation({ summary: "Delete Team (Soft)" })
  async deleteTeam(@CurrentUser() user: any, @Param("id") id: string) {
    return this.teamService.deleteTeam(user.tenantId, id, user.id);
  }
}
