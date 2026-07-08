"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const lead_controller_1 = require("./controllers/lead.controller");
const customer_controller_1 = require("./controllers/customer.controller");
const opportunity_controller_1 = require("./controllers/opportunity.controller");
const lead_service_1 = require("./services/lead.service");
const customer_service_1 = require("./services/customer.service");
const opportunity_service_1 = require("./services/opportunity.service");
const lead_repository_1 = require("./repositories/lead.repository");
const customer_repository_1 = require("./repositories/customer.repository");
const opportunity_repository_1 = require("./repositories/opportunity.repository");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [lead_controller_1.LeadController, customer_controller_1.CustomerController, opportunity_controller_1.OpportunityController],
        providers: [
            lead_service_1.LeadService,
            customer_service_1.CustomerService,
            opportunity_service_1.OpportunityService,
            lead_repository_1.LeadRepository,
            customer_repository_1.CustomerRepository,
            opportunity_repository_1.OpportunityRepository,
        ],
        exports: [lead_service_1.LeadService, customer_service_1.CustomerService, opportunity_service_1.OpportunityService],
    })
], CrmModule);
//# sourceMappingURL=crm.module.js.map