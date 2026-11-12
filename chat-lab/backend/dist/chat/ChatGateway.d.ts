import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service.js';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    server: Server;
    private activeUsers;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket, reason?: string): void;
    handleConnection(client: Socket): void;
    presenceList(ack: (res: {
        status: string;
        data: any;
    }) => void): void;
    joinRoom(client: Socket, roomId: string): void;
    messageToRoom(client: Socket, data: {
        msg: string;
        roomId: string;
    }, ack: (res: {
        status: string;
        data?: any;
        message?: string;
    }) => void): Promise<void>;
    handleChatHistory(client: Socket, roomId: string, ack: (res: {
        status: string;
        data?: any;
        message?: string;
    }) => void): Promise<void>;
}
