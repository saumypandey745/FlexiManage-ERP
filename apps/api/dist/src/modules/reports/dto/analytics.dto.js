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
exports.CreateKpiSnapshotDto = exports.KpiDto = exports.AggregationType = exports.MetricType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var MetricType;
(function (MetricType) {
    MetricType["REVENUE"] = "REVENUE";
    MetricType["EXPENSE"] = "EXPENSE";
    MetricType["USER_COUNT"] = "USER_COUNT";
    MetricType["RETENTION"] = "RETENTION";
    MetricType["CONVERSION"] = "CONVERSION";
    MetricType["PERFORMANCE"] = "PERFORMANCE";
    MetricType["OTHER"] = "OTHER";
})(MetricType || (exports.MetricType = MetricType = {}));
var AggregationType;
(function (AggregationType) {
    AggregationType["SUM"] = "SUM";
    AggregationType["COUNT"] = "COUNT";
    AggregationType["AVERAGE"] = "AVERAGE";
    AggregationType["MIN"] = "MIN";
    AggregationType["MAX"] = "MAX";
})(AggregationType || (exports.AggregationType = AggregationType = {}));
class KpiDto {
}
exports.KpiDto = KpiDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KpiDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KpiDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: MetricType }),
    (0, class_validator_1.IsEnum)(MetricType),
    __metadata("design:type", String)
], KpiDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AggregationType }),
    (0, class_validator_1.IsEnum)(AggregationType),
    __metadata("design:type", String)
], KpiDto.prototype, "aggregation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], KpiDto.prototype, "isActive", void 0);
class CreateKpiSnapshotDto {
}
exports.CreateKpiSnapshotDto = CreateKpiSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKpiSnapshotDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateKpiSnapshotDto.prototype, "dimensions", void 0);
//# sourceMappingURL=analytics.dto.js.map