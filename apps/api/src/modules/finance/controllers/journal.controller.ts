import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JournalService } from '../services/journal.service';
import { CreateJournalEntryDto } from '../dto/finance.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Finance Journal')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('finance/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  @ApiOperation({ summary: 'Post Journal Entry' })
  create(@Req() req: any, @Body() createDto: CreateJournalEntryDto) {
    return this.journalService.create(req.user.tenantId, req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Journal Entries' })
  findAll(@Req() req: any) {
    return this.journalService.findAll(req.user.tenantId);
  }
}
