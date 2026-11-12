import { ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    Ack, 
    OnGatewayInit, 
    OnGatewayConnection, 
    OnGatewayDisconnect,
    } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';





@WebSocketGateway()
export class EchoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    afterInit(server: Server)
    {

    }

    handleConnection(client: Socket)
    {
        console.log(client.id);
        client.emit("welcome", "Hi to Server");
    }

    handleDisconnect(client: Socket, reason?: string) {
        console.log("Disconnected Client");
    }


    @SubscribeMessage('hello')
    connectedClient(@ConnectedSocket() client: Socket, @MessageBody() data: string)
    {
        console.log("hello");
        console.log(data);
    }

    @SubscribeMessage('echo')
    echo(@ConnectedSocket() client: Socket, @MessageBody() data: string)
    {
        console.log("echo");
        console.log(data);
        client.emit("echo", data);
    }

    @SubscribeMessage('ack:return')
    handleReturn(@MessageBody() data: string)
    {
        console.log("ack:return");
        return data;
    }


    @SubscribeMessage('ack:manual')
    handleAck(@MessageBody() data: string, @Ack() ack: (response: {status: string, data: string}) => void,)
    {
        console.log("ack:manual");
        ack({status: 'received', data});
    }



}