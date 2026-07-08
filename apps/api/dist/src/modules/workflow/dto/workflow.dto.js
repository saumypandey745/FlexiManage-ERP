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
exports.TriggerWorkflowDto = exports.CreateWorkflowEdgeDto = exports.CreateWorkflowNodeDto = exports.UpdateWorkflowDto = exports.CreateWorkflowDto = exports.WorkflowExecutionStatus = exports.WorkflowNodeType = exports.WorkflowStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["DRAFT"] = "DRAFT";
    WorkflowStatus["PUBLISHED"] = "PUBLISHED";
    WorkflowStatus["ARCHIVED"] = "ARCHIVED";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
var WorkflowNodeType;
(function (WorkflowNodeType) {
    WorkflowNodeType["TRIGGER"] = "TRIGGER";
    WorkflowNodeType["ACTION"] = "ACTION";
    WorkflowNodeType["CONDITION"] = "CONDITION";
    WorkflowNodeType["PARALLEL"] = "PARALLEL";
    WorkflowNodeType["APPROVAL"] = "APPROVAL";
    WorkflowNodeType["WAIT"] = "WAIT";
})(WorkflowNodeType || (exports.WorkflowNodeType = WorkflowNodeType = {}));
var WorkflowExecutionStatus;
(function (WorkflowExecutionStatus) {
    WorkflowExecutionStatus["PENDING"] = "PENDING";
    WorkflowExecutionStatus["RUNNING"] = "RUNNING";
    WorkflowExecutionStatus["COMPLETED"] = "COMPLETED";
    WorkflowExecutionStatus["FAILED"] = "FAILED";
    WorkflowExecutionStatus["SUSPENDED"] = "SUSPENDED";
    WorkflowExecutionStatus["CANCELLED"] = "CANCELLED";
})(WorkflowExecutionStatus || (exports.WorkflowExecutionStatus = WorkflowExecutionStatus = {}));
class CreateWorkflowDto {
}
exports.CreateWorkflowDto = CreateWorkflowDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkflowDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkflowDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkflowDto.prototype, "description", void 0);
class UpdateWorkflowDto {
}
exports.UpdateWorkflowDto = UpdateWorkflowDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkflowDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkflowDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: WorkflowStatus }),
    (0, class_validator_1.IsEnum)(WorkflowStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkflowDto.prototype, "status", void 0);
class CreateWorkflowNodeDto {
}
exports.CreateWorkflowNodeDto = CreateWorkflowNodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: WorkflowNodeType }),
    (0, class_validator_1.IsEnum)(WorkflowNodeType),
    __metadata("design:type", String)
], CreateWorkflowNodeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkflowNodeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateWorkflowNodeDto.prototype, "config", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkflowNodeDto.prototype, "positionX", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkflowNodeDto.prototype, "positionY", void 0);
class CreateWorkflowEdgeDto {
}
exports.CreateWorkflowEdgeDto = CreateWorkflowEdgeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateWorkflowEdgeDto.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateWorkflowEdgeDto.prototype, "targetId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkflowEdgeDto.prototype, "condition", void 0);
class TriggerWorkflowDto {
}
exports.TriggerWorkflowDto = TriggerWorkflowDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TriggerWorkflowDto.prototype, "triggerData", void 0);
//# sourceMappingURL=workflow.dto.js.map