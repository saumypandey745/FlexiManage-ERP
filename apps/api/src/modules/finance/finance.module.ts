import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { InvoiceRepository } from './repositories/invoice.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { ExpenseRepository } from './repositories/expense.repository';
import { JournalRepository } from './repositories/journal.repository';
import { InvoiceService } from './services/invoice.service';
import { PaymentService } from './services/payment.service';
import { ExpenseService } from './services/expense.service';
import { JournalService } from './services/journal.service';
import { InvoiceController } from './controllers/invoice.controller';
import { PaymentController } from './controllers/payment.controller';
import { ExpenseController } from './controllers/expense.controller';
import { JournalController } from './controllers/journal.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    InvoiceController,
    PaymentController,
    ExpenseController,
    JournalController,
  ],
  providers: [
    InvoiceRepository,
    PaymentRepository,
    ExpenseRepository,
    JournalRepository,
    InvoiceService,
    PaymentService,
    ExpenseService,
    JournalService,
  ],
  exports: [
    InvoiceService,
    PaymentService,
    ExpenseService,
    JournalService,
  ],
})
export class FinanceModule {}
