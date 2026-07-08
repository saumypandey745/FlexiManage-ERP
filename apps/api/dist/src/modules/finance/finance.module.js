"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const invoice_repository_1 = require("./repositories/invoice.repository");
const payment_repository_1 = require("./repositories/payment.repository");
const expense_repository_1 = require("./repositories/expense.repository");
const journal_repository_1 = require("./repositories/journal.repository");
const invoice_service_1 = require("./services/invoice.service");
const payment_service_1 = require("./services/payment.service");
const expense_service_1 = require("./services/expense.service");
const journal_service_1 = require("./services/journal.service");
const invoice_controller_1 = require("./controllers/invoice.controller");
const payment_controller_1 = require("./controllers/payment.controller");
const expense_controller_1 = require("./controllers/expense.controller");
const journal_controller_1 = require("./controllers/journal.controller");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [
            invoice_controller_1.InvoiceController,
            payment_controller_1.PaymentController,
            expense_controller_1.ExpenseController,
            journal_controller_1.JournalController,
        ],
        providers: [
            invoice_repository_1.InvoiceRepository,
            payment_repository_1.PaymentRepository,
            expense_repository_1.ExpenseRepository,
            journal_repository_1.JournalRepository,
            invoice_service_1.InvoiceService,
            payment_service_1.PaymentService,
            expense_service_1.ExpenseService,
            journal_service_1.JournalService,
        ],
        exports: [
            invoice_service_1.InvoiceService,
            payment_service_1.PaymentService,
            expense_service_1.ExpenseService,
            journal_service_1.JournalService,
        ],
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map