import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { LeadController } from './controllers/lead.controller';
import { CustomerController } from './controllers/customer.controller';
import { OpportunityController } from './controllers/opportunity.controller';
import { LeadService } from './services/lead.service';
import { CustomerService } from './services/customer.service';
import { OpportunityService } from './services/opportunity.service';
import { LeadRepository } from './repositories/lead.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { OpportunityRepository } from './repositories/opportunity.repository';

@Module({
  imports: [PrismaModule],
  controllers: [LeadController, CustomerController, OpportunityController],
  providers: [
    LeadService,
    CustomerService,
    OpportunityService,
    LeadRepository,
    CustomerRepository,
    OpportunityRepository,
  ],
  exports: [LeadService, CustomerService, OpportunityService],
})
export class CrmModule {}
