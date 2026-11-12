import { Module } from '@nestjs/common';
import { ChatGateway } from './ChatGateway.js';
import { MessagesService } from './messages.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [ChatGateway, MessagesService],
  exports: [MessagesService],
})
export class ChatModule {}