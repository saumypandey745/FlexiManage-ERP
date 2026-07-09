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
import { ReportService } from "../services/report.service";
import {
  CreateReportDto,
  UpdateReportDto,
  GenerateReportDto,
} from "../dto/report.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { RolesGuard } from "../../../common/guards/roles.guard";
import { Roles } from "../../../common/decorators/auth.decorators";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("reports")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller("reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Create a new report" })
  create(@Req() req: any, @Body() dto: CreateReportDto) {
    return this.reportService.create(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @Roles("ADMIN", "MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Get all reports" })
  findAll(
    @Req() req: any,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    return this.reportService.findAll(
      req.user.tenantId,
      +(page || 1),
      +(limit || 10)
    );
  }

  @Get(":id")
  @Roles("ADMIN", "MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Get a report by id" })
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.reportService.findOne(req.user.tenantId, id);
  }

  @Patch(":id")
  @Roles("ADMIN", "MANAGER")
  @ApiOperation({ summary: "Update a report" })
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateReportDto,
    @Query("version") version: string
  ) {
    return this.reportService.update(
      req.user.tenantId,
      id,
      dto,
      +(version || 1),
      req.user.id
    );
  }

  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Delete a report" })
  remove(@Req() req: any, @Param("id") id: string) {
    return this.reportService.delete(req.user.tenantId, id, req.user.id);
  }

  @Post(":id/generate")
  @Roles("ADMIN", "MANAGER", "EMPLOYEE")
  @ApiOperation({ summary: "Generate report execution" })
  generate(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: GenerateReportDto
  ) {
    return this.reportService.generate(req.user.tenantId, id, req.user.id, dto);
  }
}
