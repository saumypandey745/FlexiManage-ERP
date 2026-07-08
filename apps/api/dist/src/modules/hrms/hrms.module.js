"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrmsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const employee_repository_1 = require("./repositories/employee.repository");
const attendance_repository_1 = require("./repositories/attendance.repository");
const leave_repository_1 = require("./repositories/leave.repository");
const payroll_repository_1 = require("./repositories/payroll.repository");
const employee_service_1 = require("./services/employee.service");
const attendance_service_1 = require("./services/attendance.service");
const leave_service_1 = require("./services/leave.service");
const payroll_service_1 = require("./services/payroll.service");
const employee_controller_1 = require("./controllers/employee.controller");
const attendance_controller_1 = require("./controllers/attendance.controller");
const leave_controller_1 = require("./controllers/leave.controller");
const payroll_controller_1 = require("./controllers/payroll.controller");
let HrmsModule = class HrmsModule {
};
exports.HrmsModule = HrmsModule;
exports.HrmsModule = HrmsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [
            employee_controller_1.EmployeeController,
            attendance_controller_1.AttendanceController,
            leave_controller_1.LeaveController,
            payroll_controller_1.PayrollController,
        ],
        providers: [
            employee_repository_1.EmployeeRepository,
            attendance_repository_1.AttendanceRepository,
            leave_repository_1.LeaveRepository,
            payroll_repository_1.PayrollRepository,
            employee_service_1.EmployeeService,
            attendance_service_1.AttendanceService,
            leave_service_1.LeaveService,
            payroll_service_1.PayrollService,
        ],
        exports: [
            employee_service_1.EmployeeService,
            attendance_service_1.AttendanceService,
            leave_service_1.LeaveService,
            payroll_service_1.PayrollService,
        ],
    })
], HrmsModule);
//# sourceMappingURL=hrms.module.js.map