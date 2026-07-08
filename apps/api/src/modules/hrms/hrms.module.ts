import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { EmployeeRepository } from './repositories/employee.repository';
import { AttendanceRepository } from './repositories/attendance.repository';
import { LeaveRepository } from './repositories/leave.repository';
import { PayrollRepository } from './repositories/payroll.repository';
import { EmployeeService } from './services/employee.service';
import { AttendanceService } from './services/attendance.service';
import { LeaveService } from './services/leave.service';
import { PayrollService } from './services/payroll.service';
import { EmployeeController } from './controllers/employee.controller';
import { AttendanceController } from './controllers/attendance.controller';
import { LeaveController } from './controllers/leave.controller';
import { PayrollController } from './controllers/payroll.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    EmployeeController,
    AttendanceController,
    LeaveController,
    PayrollController,
  ],
  providers: [
    EmployeeRepository,
    AttendanceRepository,
    LeaveRepository,
    PayrollRepository,
    EmployeeService,
    AttendanceService,
    LeaveService,
    PayrollService,
  ],
  exports: [
    EmployeeService,
    AttendanceService,
    LeaveService,
    PayrollService,
  ],
})
export class HrmsModule {}
