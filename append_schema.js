const fs = require('fs');

const schemaPath = 'apps/api/prisma/schema.prisma';
let content = fs.readFileSync(schemaPath, 'utf8');

const tenantInsert = `
  notifications    Notification[]
  notificationPreferences NotificationPreference[]
  notificationTemplates NotificationTemplate[]
  emailLogs        EmailLog[]
  smsLogs          SmsLog[]
  pushNotifications PushNotification[]
  inAppNotifications InAppNotification[]
  webhooks         Webhook[]
  chatRooms        ChatRoom[]
  announcements    Announcement[]
  notificationQueues NotificationQueue[]
  communicationAudits CommunicationAudit[]
`;

const userInsert = `
  sentNotifications Notification[] @relation("NotificationSender")
  receivedNotifications NotificationRecipient[] @relation("NotificationReceiver")
  notificationPreferences NotificationPreference[] @relation("NotificationPrefs")
  pushNotifications PushNotification[]
  inAppNotifications InAppNotification[]
  chatParticipants ChatParticipant[]
  sentMessages     ChatMessage[] @relation("MessageSender")
  messageReactions MessageReaction[]
  publishedAnnouncements Announcement[] @relation("AnnouncementPublisher")
  receivedAnnouncements AnnouncementRecipient[] @relation("AnnouncementReceiver")
  commAudits       CommunicationAudit[] @relation("CommAuditUser")
`;

content = content.replace(/(model Tenant \{[^}]*)(\n})/, `$1${tenantInsert}$2`);
content = content.replace(/(model User \{[^}]*)(\n})/, `$1${userInsert}$2`);

const newModels = `
// --------------------------------------------------------------------------
// Phase 07M - Notification & Communication Platform
// --------------------------------------------------------------------------

enum NotificationType {
  SYSTEM
  ALERT
  REMINDER
  MESSAGE
  ANNOUNCEMENT
}

enum NotificationChannel {
  EMAIL
  SMS
  PUSH
  IN_APP
  WEBHOOK
}

enum NotificationStatus {
  PENDING
  PROCESSING
  SENT
  FAILED
  READ
}

enum MessageStatus {
  SENT
  DELIVERED
  READ
  FAILED
}

enum MessageType {
  TEXT
  IMAGE
  FILE
  SYSTEM
}

enum WebhookStatus {
  ACTIVE
  INACTIVE
  FAILED
}

enum AnnouncementPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

enum DeliveryStatus {
  PENDING
  SENT
  FAILED
}

enum RecipientType {
  USER
  ROLE
  DEPARTMENT
  ALL
}

model Notification {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  type           NotificationType
  title          String       @db.VarChar(255)
  body           String       @db.Text
  data           Json?        

  senderId       String?      @db.Uuid
  sender         User?        @relation("NotificationSender", fields: [senderId], references: [id], onDelete: SetNull)

  recipients     NotificationRecipient[]
  status         NotificationStatus @default(PENDING)

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  @@index([tenantId])
  @@map("nc_notifications")
}

model NotificationRecipient {
  id             String       @id @default(uuid()) @db.Uuid
  notificationId String       @db.Uuid
  notification   Notification @relation(fields: [notificationId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation("NotificationReceiver", fields: [userId], references: [id], onDelete: Cascade)

  channel        NotificationChannel
  status         DeliveryStatus @default(PENDING)
  isRead         Boolean      @default(false)
  readAt         DateTime?
  error          String?      @db.Text

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@index([notificationId])
  @@index([userId])
  @@map("nc_notification_recipients")
}

model NotificationPreference {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation("NotificationPrefs", fields: [userId], references: [id], onDelete: Cascade)

  type           NotificationType
  emailEnabled   Boolean      @default(true)
  smsEnabled     Boolean      @default(false)
  pushEnabled    Boolean      @default(true)
  inAppEnabled   Boolean      @default(true)

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@unique([userId, type])
  @@index([tenantId])
  @@map("nc_notification_preferences")
}

model NotificationTemplate {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  code           String       @db.VarChar(100)
  name           String       @db.VarChar(255)
  subject        String       @db.VarChar(255)
  body           String       @db.Text
  type           NotificationType
  channel        NotificationChannel

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@unique([tenantId, code, channel])
  @@index([tenantId])
  @@map("nc_notification_templates")
}

model EmailLog {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  recipientEmail String       @db.VarChar(255)
  subject        String       @db.VarChar(255)
  body           String       @db.Text
  status         DeliveryStatus @default(PENDING)
  error          String?      @db.Text

  createdAt      DateTime     @default(now())

  @@index([tenantId])
  @@map("nc_email_logs")
}

model SmsLog {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  phoneNumber    String       @db.VarChar(50)
  message        String       @db.Text
  status         DeliveryStatus @default(PENDING)
  error          String?      @db.Text

  createdAt      DateTime     @default(now())

  @@index([tenantId])
  @@map("nc_sms_logs")
}

model PushNotification {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  deviceToken    String       @db.VarChar(255)
  title          String       @db.VarChar(255)
  body           String       @db.Text
  status         DeliveryStatus @default(PENDING)
  error          String?      @db.Text

  createdAt      DateTime     @default(now())

  @@index([tenantId])
  @@index([userId])
  @@map("nc_push_notifications")
}

model InAppNotification {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  title          String       @db.VarChar(255)
  body           String       @db.Text
  isRead         Boolean      @default(false)
  readAt         DateTime?

  createdAt      DateTime     @default(now())

  @@index([tenantId])
  @@index([userId])
  @@map("nc_in_app_notifications")
}

model Webhook {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  name           String       @db.VarChar(255)
  url            String       @db.VarChar(512)
  secret         String?      @db.VarChar(255)
  events         String[]     
  status         WebhookStatus @default(ACTIVE)

  deliveries     WebhookDelivery[]

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@index([tenantId])
  @@map("nc_webhooks")
}

model WebhookDelivery {
  id             String       @id @default(uuid()) @db.Uuid
  webhookId      String       @db.Uuid
  webhook        Webhook      @relation(fields: [webhookId], references: [id], onDelete: Cascade)

  event          String       @db.VarChar(100)
  payload        Json
  responseStatus Int?
  responseBody   String?      @db.Text
  isSuccessful   Boolean      @default(false)
  error          String?      @db.Text

  createdAt      DateTime     @default(now())

  @@index([webhookId])
  @@map("nc_webhook_deliveries")
}

model ChatRoom {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  name           String?      @db.VarChar(255)
  isGroup        Boolean      @default(false)
  
  participants   ChatParticipant[]
  messages       ChatMessage[]

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  @@index([tenantId])
  @@map("nc_chat_rooms")
}

model ChatParticipant {
  id             String       @id @default(uuid()) @db.Uuid
  roomId         String       @db.Uuid
  room           ChatRoom     @relation(fields: [roomId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  joinedAt       DateTime     @default(now())
  leftAt         DateTime?
  lastReadMessageId String?   @db.Uuid 

  @@unique([roomId, userId])
  @@index([userId])
  @@map("nc_chat_participants")
}

model ChatMessage {
  id             String       @id @default(uuid()) @db.Uuid
  roomId         String       @db.Uuid
  room           ChatRoom     @relation(fields: [roomId], references: [id], onDelete: Cascade)

  senderId       String       @db.Uuid
  sender         User         @relation("MessageSender", fields: [senderId], references: [id], onDelete: Cascade)

  type           MessageType  @default(TEXT)
  content        String       @db.Text
  status         MessageStatus @default(SENT)

  attachments    MessageAttachment[]
  reactions      MessageReaction[]

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  @@index([roomId])
  @@index([senderId])
  @@map("nc_chat_messages")
}

model MessageAttachment {
  id             String       @id @default(uuid()) @db.Uuid
  messageId      String       @db.Uuid
  message        ChatMessage  @relation(fields: [messageId], references: [id], onDelete: Cascade)

  fileUrl        String       @db.VarChar(512)
  fileName       String       @db.VarChar(255)
  fileType       String       @db.VarChar(100)
  fileSize       Int

  createdAt      DateTime     @default(now())

  @@index([messageId])
  @@map("nc_message_attachments")
}

model MessageReaction {
  id             String       @id @default(uuid()) @db.Uuid
  messageId      String       @db.Uuid
  message        ChatMessage  @relation(fields: [messageId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  emoji          String       @db.VarChar(20)

  createdAt      DateTime     @default(now())

  @@unique([messageId, userId, emoji])
  @@map("nc_message_reactions")
}

model Announcement {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  title          String       @db.VarChar(255)
  content        String       @db.Text
  priority       AnnouncementPriority @default(NORMAL)

  publisherId    String       @db.Uuid
  publisher      User         @relation("AnnouncementPublisher", fields: [publisherId], references: [id], onDelete: Cascade)

  validUntil     DateTime?
  status         DeliveryStatus @default(PENDING)

  recipients     AnnouncementRecipient[]

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  deletedAt      DateTime?

  @@index([tenantId])
  @@map("nc_announcements")
}

model AnnouncementRecipient {
  id             String       @id @default(uuid()) @db.Uuid
  announcementId String       @db.Uuid
  announcement   Announcement @relation(fields: [announcementId], references: [id], onDelete: Cascade)

  userId         String       @db.Uuid
  user           User         @relation("AnnouncementReceiver", fields: [userId], references: [id], onDelete: Cascade)

  isRead         Boolean      @default(false)
  readAt         DateTime?

  createdAt      DateTime     @default(now())

  @@unique([announcementId, userId])
  @@map("nc_announcement_recipients")
}

model NotificationQueue {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  payload        Json
  channel        NotificationChannel
  status         DeliveryStatus @default(PENDING)
  retryCount     Int          @default(0)
  nextRetryAt    DateTime?
  error          String?      @db.Text

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@index([tenantId])
  @@index([status, nextRetryAt])
  @@map("nc_notification_queue")
}

model CommunicationAudit {
  id             String       @id @default(uuid()) @db.Uuid
  tenantId       String       @db.Uuid
  tenant         Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  action         String       @db.VarChar(100)
  entityId       String       @db.Uuid
  entityType     String       @db.VarChar(50)
  details        Json?

  userId         String?      @db.Uuid
  user           User?        @relation("CommAuditUser", fields: [userId], references: [id], onDelete: SetNull)

  createdAt      DateTime     @default(now())

  @@index([tenantId])
  @@map("nc_communication_audit")
}
`;

fs.writeFileSync(schemaPath, content + '\n' + newModels);
