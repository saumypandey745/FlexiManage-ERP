import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from '../services/document.service';
import { CreateFolderDto, UpdateFolderDto } from '../dto/documents.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('folders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('folders')
export class FolderController {
  constructor(private readonly docService: DocumentService) {}

  @Post()
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Create a folder' })
  createFolder(@Req() req: any, @Body() dto: CreateFolderDto) {
    return this.docService.createFolder(req.user.tenantId, dto);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get all folders' })
  getFolders(@Req() req: any, @Query('parentId') parentId?: string) {
    return this.docService.getFolders(req.user.tenantId, parentId);
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Update folder' })
  updateFolder(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateFolderDto) {
    return this.docService.updateFolder(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete folder' })
  deleteFolder(@Req() req: any, @Param('id') id: string) {
    return this.docService.deleteFolder(req.user.tenantId, id);
  }
}
