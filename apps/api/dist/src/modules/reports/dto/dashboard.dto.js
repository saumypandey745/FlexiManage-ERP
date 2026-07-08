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
exports.WidgetDto = exports.UpdateDashboardDto = exports.CreateDashboardDto = exports.ChartType = exports.WidgetType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var WidgetType;
(function (WidgetType) {
    WidgetType["CHART"] = "CHART";
    WidgetType["TABLE"] = "TABLE";
    WidgetType["KPI_CARD"] = "KPI_CARD";
    WidgetType["MAP"] = "MAP";
    WidgetType["TIMELINE"] = "TIMELINE";
})(WidgetType || (exports.WidgetType = WidgetType = {}));
var ChartType;
(function (ChartType) {
    ChartType["BAR"] = "BAR";
    ChartType["LINE"] = "LINE";
    ChartType["PIE"] = "PIE";
    ChartType["DOUGHNUT"] = "DOUGHNUT";
    ChartType["AREA"] = "AREA";
    ChartType["SCATTER"] = "SCATTER";
})(ChartType || (exports.ChartType = ChartType = {}));
class CreateDashboardDto {
}
exports.CreateDashboardDto = CreateDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDashboardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDashboardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateDashboardDto.prototype, "layout", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDashboardDto.prototype, "isDefault", void 0);
class UpdateDashboardDto {
}
exports.UpdateDashboardDto = UpdateDashboardDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDashboardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDashboardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateDashboardDto.prototype, "layout", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateDashboardDto.prototype, "isDefault", void 0);
class WidgetDto {
}
exports.WidgetDto = WidgetDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WidgetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: WidgetType }),
    (0, class_validator_1.IsEnum)(WidgetType),
    __metadata("design:type", String)
], WidgetDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ChartType }),
    (0, class_validator_1.IsEnum)(ChartType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WidgetDto.prototype, "chartType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WidgetDto.prototype, "positionX", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WidgetDto.prototype, "positionY", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WidgetDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WidgetDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], WidgetDto.prototype, "dataSource", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], WidgetDto.prototype, "config", void 0);
//# sourceMappingURL=dashboard.dto.js.map