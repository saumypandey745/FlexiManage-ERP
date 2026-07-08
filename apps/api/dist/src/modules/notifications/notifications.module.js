"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const notification_controller_1 = require("./controllers/notification.controller");
const chat_controller_1 = require("./controllers/chat.controller");
const notification_service_1 = require("./services/notification.service");
const chat_service_1 = require("./services/chat.service");
const notification_repository_1 = require("./repositories/notification.repository");
const chat_repository_1 = require("./repositories/chat.repository");
const webhook_repository_1 = require("./repositories/webhook.repository");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            notification_controller_1.NotificationController,
            chat_controller_1.ChatController
        ],
        providers: [
            notification_service_1.NotificationService,
            chat_service_1.ChatService,
            notification_repository_1.NotificationRepository,
            chat_repository_1.ChatRepository,
            webhook_repository_1.WebhookRepository
        ],
        exports: [
            notification_service_1.NotificationService,
            chat_service_1.ChatService
        ]
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map