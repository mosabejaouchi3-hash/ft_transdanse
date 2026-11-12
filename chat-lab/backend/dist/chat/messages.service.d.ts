import { PrismaService } from '../prisma/prisma.service.js';
import { Chat } from '../generated/prisma/client.js';
import { CreateChatDto } from './dto/chat.dto.js';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(data: CreateChatDto): Promise<Chat>;
    findByRoom(roomId: string): Promise<{
        id: number;
        senderId: string;
        text: string;
        createdAt: Date;
    }[]>;
}
