import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { ChatController } from './controllers/chat.controller';
import { NotificationService } from './services/notification.service';
import { ChatService } from './services/chat.service';
import { NotificationRepository } from './repositories/notification.repository';
import { ChatRepository } from './repositories/chat.repository';
import { WebhookRepository } from './repositories/webhook.repository';

@Module({
  controllers: [
    NotificationController,
    ChatController
  ],
  providers: [
    NotificationService,
    ChatService,
    NotificationRepository,
    ChatRepository,
    WebhookRepository
  ],
  exports: [
    NotificationService,
    ChatService
  ]
})
export class NotificationsModule {}
