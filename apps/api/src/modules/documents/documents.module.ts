import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentController } from './controllers/document.controller';
import { FolderController } from './controllers/folder.controller';
import { DocumentService } from './services/document.service';
import { DocumentRepository } from './repositories/document.repository';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 50 // 50MB
      }
    })
  ],
  controllers: [
    DocumentController,
    FolderController
  ],
  providers: [
    DocumentService,
    DocumentRepository,
    {
      provide: 'StorageProvider',
      useClass: CloudinaryProvider
    }
  ],
  exports: [DocumentService]
})
export class DocumentsModule {}
