import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from '../services/document.service';
import { UploadDocumentDto, UpdateDocumentDto, ShareDocumentDto, SearchDocumentDto } from '../dto/documents.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes } from '@nestjs/swagger';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('documents')
export class DocumentController {
  constructor(private readonly docService: DocumentService) {}

  @Post('upload')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a document' })
  upload(
    @Req() req: any, 
    @UploadedFile() file: any,
    @Body() dto: UploadDocumentDto
  ) {
    return this.docService.uploadDocument(req.user.tenantId, req.user.id, file, dto.folderId, dto.description);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'List documents' })
  findAll(@Req() req: any, @Query('folderId') folderId?: string) {
    return this.docService.getDocuments(req.user.tenantId, folderId);
  }

  @Post('search')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Search documents' })
  search(@Req() req: any, @Body() dto: SearchDocumentDto) {
    return this.docService.searchDocuments(req.user.tenantId, dto.q || '');
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get document details' })
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.docService.getDocument(req.user.tenantId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Update document' })
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.docService.updateDocument(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete document' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.docService.deleteDocument(req.user.tenantId, id, req.user.id);
  }

  @Post(':id/share')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Share document' })
  share(@Req() req: any, @Param('id') id: string, @Body() dto: ShareDocumentDto) {
    return this.docService.shareDocument(req.user.tenantId, id, req.user.id, dto);
  }

  @Post(':id/check-out')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Lock document for editing' })
  checkOut(@Req() req: any, @Param('id') id: string) {
    return this.docService.checkOutDocument(req.user.tenantId, id, req.user.id);
  }

  @Post(':id/check-in')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Unlock document after editing' })
  checkIn(@Req() req: any, @Param('id') id: string) {
    return this.docService.checkInDocument(req.user.tenantId, id, req.user.id);
  }

  @Get(':id/download')
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get document download URL' })
  download(@Req() req: any, @Param('id') id: string) {
    return this.docService.getSignedUrl(req.user.tenantId, id, req.user.id);
  }
}
