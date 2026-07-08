import { Controller, Get, Post, Body, Param, UseGuards, Query, Req } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { CreateChatRoomDto, SendMessageDto } from '../dto/chat.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Create a new chat room' })
  createRoom(@Req() req: any, @Body() dto: CreateChatRoomDto) {
    return this.chatService.createRoom(req.user.tenantId, req.user.id, dto);
  }

  @Get('rooms')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get all user chat rooms' })
  getRooms(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getRooms(req.user.tenantId, req.user.id, +(page || 1), +(limit || 20));
  }

  @Post('messages')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Send a message to a room' })
  sendMessage(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(req.user.tenantId, req.user.id, dto);
  }

  @Get('rooms/:roomId/messages')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get messages for a room' })
  getMessages(
    @Req() req: any,
    @Param('roomId') roomId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getMessages(req.user.tenantId, roomId, req.user.id, +(page || 1), +(limit || 50));
  }
}
