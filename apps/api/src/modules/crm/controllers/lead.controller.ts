import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { CurrentUser } from '../../../common/decorators/auth.decorators';
import { LeadService } from '../services/lead.service';
import { CreateLeadDto, UpdateLeadDto } from '../dto/crm.dto';
import { LeadStatus } from '@prisma/client';

@ApiTags('CRM - Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('crm/leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @ApiOperation({ summary: 'List Leads' })
  async getLeads(@CurrentUser() user: any) {
    return this.leadService.getLeads(user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Lead By ID' })
  async getLead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.leadService.getLeadById(user.tenantId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Lead' })
  async createLead(@CurrentUser() user: any, @Body() dto: CreateLeadDto) {
    return this.leadService.createLead(user.tenantId, user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Lead' })
  async updateLead(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadService.updateLead(user.tenantId, id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete (Archive) Lead' })
  async deleteLead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.leadService.deleteLead(user.tenantId, id, user.id);
  }
}
