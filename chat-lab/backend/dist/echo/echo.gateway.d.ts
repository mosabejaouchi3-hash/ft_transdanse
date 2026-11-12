import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class EchoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket, reason?: string): void;
    connectedClient(client: Socket, data: string): void;
    echo(client: Socket, data: string): void;
    handleReturn(data: string): string;
    handleAck(data: string, ack: (response: {
        status: string;
        data: string;
    }) => void): void;
}
