import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AiService } from '../services/ai.service';
import { ChatRequestDto, CreateTemplateDto, SemanticSearchDto, EmbedDocumentDto } from '../dto/ai.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiVectorRepository } from '../repositories/ai-vector.repository';
import { AiGatewayService } from '../providers/ai-gateway.service';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly vectorRepo: AiVectorRepository,
    private readonly gatewayService: AiGatewayService
  ) {}

  @Post('chat')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Chat with AI' })
  chat(@Req() req: any, @Body() dto: ChatRequestDto) {
    return this.aiService.chat(req.user.tenantId, req.user.id, dto);
  }

  @Post('template')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Create a prompt template' })
  createTemplate(@Req() req: any, @Body() dto: CreateTemplateDto) {
    return this.aiService.createTemplate(req.user.tenantId, dto);
  }

  @Get('templates')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get prompt templates' })
  getTemplates(@Req() req: any) {
    return this.aiService.getTemplates(req.user.tenantId);
  }

  @Get('conversations')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get user conversations' })
  getConversations(@Req() req: any) {
    return this.aiService.getConversations(req.user.tenantId, req.user.id);
  }

  @Get('conversations/:id')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get conversation details' })
  getConversation(@Req() req: any, @Param('id') id: string) {
    return this.aiService.getConversation(req.user.tenantId, id);
  }

  @Delete('conversations/:id')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Delete a conversation' })
  deleteConversation(@Req() req: any, @Param('id') id: string) {
    return this.aiService.deleteConversation(req.user.tenantId, id);
  }

  @Post('embed')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Embed a document' })
  async embedDocument(@Req() req: any, @Body() dto: EmbedDocumentDto) {
    const doc = await this.vectorRepo.saveDocument(req.user.tenantId, dto);
    const provider = this.gatewayService.getProvider();
    
    // Very basic chunking (mock)
    const chunks = [dto.content.substring(0, 1000)];
    
    for (let i = 0; i < chunks.length; i++) {
      const vector = await provider.embed(chunks[i]);
      await this.vectorRepo.saveEmbedding(req.user.tenantId, doc.id, chunks[i], i, vector);
    }
    
    return { success: true, documentId: doc.id };
  }

  @Post('search')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Semantic search' })
  async semanticSearch(@Req() req: any, @Body() dto: SemanticSearchDto) {
    const provider = this.gatewayService.getProvider();
    const queryVector = await provider.embed(dto.query);
    return this.vectorRepo.similaritySearch(req.user.tenantId, queryVector, 5);
  }
}
