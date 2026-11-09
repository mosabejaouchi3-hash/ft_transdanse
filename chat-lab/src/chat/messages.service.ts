import { PrismaService } from '../prisma/prisma.service.js';
import { Chat } from '../generated/prisma/client.js';
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/chat.dto.js';


@Injectable()
export class MessagesService
{
    constructor (private readonly prisma: PrismaService) { }

    async save(data: CreateChatDto): Promise<Chat>
    {
        return await this.prisma.chat.create({data});
    }

    async findByRoom(roomId: string): Promise<{ id: number; senderId: string; text: string; createdAt: Date }[]> {
        return await this.prisma.chat.findMany({
            where: { roomId },
            select: {
                id: true,
                senderId: true,
                text: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'asc' },
        });
    }
}
