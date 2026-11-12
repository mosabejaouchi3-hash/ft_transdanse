import { Module } from '@nestjs/common';
import { NotesModule } from './note.module.js';
import { EventsModule } from '../echo/echo.module.js';
import { ChatModule } from '../chat/chat.module.js';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '../prisma/prisma.module.js'


@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ChatModule],
})
export class AppModule { }