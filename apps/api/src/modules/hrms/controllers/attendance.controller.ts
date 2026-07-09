import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AttendanceService } from "../services/attendance.service";
import { ClockInDto, ClockOutDto } from "../dto/hrms.dto";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../../common/guards/tenant.guard";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("HRMS Attendance")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller("hrms/attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post("clock-in")
  @ApiOperation({ summary: "Clock In" })
  clockIn(@Req() req: any, @Body() dto: ClockInDto) {
    return this.attendanceService.clockIn(req.user.tenantId, req.user.id, dto);
  }

  @Post("clock-out")
  @ApiOperation({ summary: "Clock Out" })
  clockOut(@Req() req: any, @Body() dto: ClockOutDto) {
    return this.attendanceService.clockOut(req.user.tenantId, req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: "List Attendances" })
  findAll(@Req() req: any) {
    return this.attendanceService.findAll(req.user.tenantId);
  }
}
