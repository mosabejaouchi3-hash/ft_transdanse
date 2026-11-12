var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
const MAX_MSG = 50;
let MessagesService = class MessagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(data) {
        return await this.prisma.chat.create({ data });
    }
    async findByRoom(roomId) {
        const messages = await this.prisma.chat.findMany({
            where: { roomId },
            select: {
                id: true,
                senderId: true,
                text: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: MAX_MSG,
        });
        return messages.reverse();
    }
};
MessagesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages.service.js.map