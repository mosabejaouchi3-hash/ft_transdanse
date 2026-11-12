var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, Ack, } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service.js';
import { CHAT_EVENTS } from './events.js';
let ChatGateway = class ChatGateway {
    messagesService;
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    server;
    activeUsers = new Map();
    afterInit(server) {
    }
    handleDisconnect(client, reason) {
        console.log(reason);
    }
    handleConnection(client) {
        client.data.userId = client.handshake.auth.userId;
        if (this.activeUsers.has(client.data.userId)) {
            this.activeUsers.get(client.data.userId)?.add(client.id);
        }
        else {
            this.activeUsers.set(client.data.userId, new Set([client.id]));
            this.server.emit(CHAT_EVENTS.PRESENCE_UPDATE, {
                userId: client.data.userId,
                status: 'online',
            });
        }
        console.log(`Connected: ${client.id}`);
        client.on('disconnecting', () => {
            const customRooms = [...client.rooms].filter((room) => room !== client.id);
            if (this.activeUsers.has(client.data.userId)) {
                if (this.activeUsers.get(client.data.userId)?.size === 1) {
                    this.activeUsers.delete(client.data.userId);
                    this.server.emit(CHAT_EVENTS.PRESENCE_UPDATE, {
                        userId: client.data.userId,
                        status: 'offline',
                    });
                }
                else {
                    this.activeUsers.get(client.data.userId)?.delete(client.id);
                }
            }
            customRooms.forEach((roomId) => {
                client.to(roomId).emit(CHAT_EVENTS.USER_LEFT, {
                    userId: client.data.userId,
                    roomId,
                });
            });
        });
    }
    presenceList(ack) {
        ack({ status: "ok", data: Array.from(this.activeUsers.keys()) });
    }
    joinRoom(client, roomId) {
        if (typeof roomId === 'string' && roomId.trim().length > 0) {
            client.join(roomId);
        }
    }
    async messageToRoom(client, data, ack) {
        if (!client.rooms.has(data.roomId)) {
            ack({ status: 'error', message: 'Unauthorized: client is not in room' });
            return;
        }
        try {
            const savedMessage = await this.messagesService.save({
                senderId: client.data.userId,
                roomId: data.roomId,
                text: data.msg,
            });
            client.to(data.roomId).emit(CHAT_EVENTS.CHAT_MESSAGE, savedMessage);
            ack({ status: 'sent', data: savedMessage });
        }
        catch (error) {
            console.error(error);
            ack({ status: 'error', message: 'Failed to save message' });
        }
    }
    async handleChatHistory(client, roomId, ack) {
        if (!client.rooms.has(roomId)) {
            ack({ status: 'error', message: 'Unauthorized: client is not in room' });
            return;
        }
        try {
            const ChatHistory = await this.messagesService.findByRoom(roomId);
            ack({ status: 'sent', data: ChatHistory });
        }
        catch (error) {
            console.error(error);
            ack({ status: 'error', message: 'Failed to save message' });
        }
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage(CHAT_EVENTS.PRESENCE_LIST),
    __param(0, Ack()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "presenceList", null);
__decorate([
    SubscribeMessage(CHAT_EVENTS.ROOM_JOIN),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "joinRoom", null);
__decorate([
    SubscribeMessage(CHAT_EVENTS.CHAT_SEND),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __param(2, Ack()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Object, Function]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "messageToRoom", null);
__decorate([
    SubscribeMessage(CHAT_EVENTS.CHAT_HISTORY),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __param(2, Ack()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String, Function]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleChatHistory", null);
ChatGateway = __decorate([
    WebSocketGateway({
        cors: {
            origin: true,
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [MessagesService])
], ChatGateway);
export { ChatGateway };
//# sourceMappingURL=ChatGateway.js.map