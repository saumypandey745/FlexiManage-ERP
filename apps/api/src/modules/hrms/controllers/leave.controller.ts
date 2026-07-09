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
import { LeaveService } from "../services/leave.service";
import { CreateLeaveDto, ApproveLeaveDto } from "../dto/hrms.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("HRMS Leaves")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("hrms/leaves")
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post(":employeeId")
  @ApiOperation({ summary: "Request Leave" })
  create(
    @Req() req: any,
    @Param("employeeId") employeeId: string,
    @Body() dto: CreateLeaveDto
  ) {
    return this.leaveService.create(
      req.user.tenantId,
      req.user.id,
      employeeId,
      dto
    );
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Approve/Reject Leave" })
  updateStatus(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: ApproveLeaveDto
  ) {
    return this.leaveService.updateStatus(
      req.user.tenantId,
      id,
      req.user.id,
      dto
    );
  }

  @Get()
  @ApiOperation({ summary: "List Leaves" })
  findAll(@Req() req: any) {
    return this.leaveService.findAll(req.user.tenantId);
  }
}
