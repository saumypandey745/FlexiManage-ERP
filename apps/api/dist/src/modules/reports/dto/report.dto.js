"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDto = exports.ScheduleReportDto = exports.GenerateReportDto = exports.UpdateReportDto = exports.CreateReportDto = exports.ScheduleFrequency = exports.ExportFormat = exports.ReportStatus = exports.ReportType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ReportType;
(function (ReportType) {
    ReportType["STANDARD"] = "STANDARD";
    ReportType["CUSTOM"] = "CUSTOM";
    ReportType["FINANCIAL"] = "FINANCIAL";
    ReportType["HR"] = "HR";
    ReportType["PROJECT"] = "PROJECT";
    ReportType["CRM"] = "CRM";
    ReportType["INVENTORY"] = "INVENTORY";
})(ReportType || (exports.ReportType = ReportType = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["DRAFT"] = "DRAFT";
    ReportStatus["PUBLISHED"] = "PUBLISHED";
    ReportStatus["ARCHIVED"] = "ARCHIVED";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var ExportFormat;
(function (ExportFormat) {
    ExportFormat["CSV"] = "CSV";
    ExportFormat["EXCEL"] = "EXCEL";
    ExportFormat["PDF"] = "PDF";
    ExportFormat["JSON"] = "JSON";
})(ExportFormat || (exports.ExportFormat = ExportFormat = {}));
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency["DAILY"] = "DAILY";
    ScheduleFrequency["WEEKLY"] = "WEEKLY";
    ScheduleFrequency["MONTHLY"] = "MONTHLY";
    ScheduleFrequency["QUARTERLY"] = "QUARTERLY";
    ScheduleFrequency["YEARLY"] = "YEARLY";
})(ScheduleFrequency || (exports.ScheduleFrequency = ScheduleFrequency = {}));
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReportType }),
    (0, class_validator_1.IsEnum)(ReportType),
    __metadata("design:type", String)
], CreateReportDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateReportDto.prototype, "queryConfig", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateReportDto.prototype, "columns", void 0);
class UpdateReportDto {
}
exports.UpdateReportDto = UpdateReportDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ReportStatus }),
    (0, class_validator_1.IsEnum)(ReportStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateReportDto.prototype, "queryConfig", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateReportDto.prototype, "columns", void 0);
class GenerateReportDto {
}
exports.GenerateReportDto = GenerateReportDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GenerateReportDto.prototype, "filters", void 0);
class ScheduleReportDto {
}
exports.ScheduleReportDto = ScheduleReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ScheduleFrequency }),
    (0, class_validator_1.IsEnum)(ScheduleFrequency),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "cronExpression", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ExportFormat }),
    (0, class_validator_1.IsEnum)(ExportFormat),
    __metadata("design:type", String)
], ScheduleReportDto.prototype, "exportFormat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ScheduleReportDto.prototype, "recipients", void 0);
class ExportDto {
}
exports.ExportDto = ExportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ExportFormat }),
    (0, class_validator_1.IsEnum)(ExportFormat),
    __metadata("design:type", String)
], ExportDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ExportDto.prototype, "filters", void 0);
//# sourceMappingURL=report.dto.js.map