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
import { MessagesService } from './messages.service.js'


@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

	constructor(private readonly messagesService: MessagesService) { }

	@WebSocketServer()
	server: Server;

	afterInit(server: Server)
	{

	}

	handleDisconnect(client: Socket, reason?: string) {
		console.log(reason);
	}



	handleConnection(client: Socket) {
		client.data.userId = client.handshake.auth.userId;
		console.log(`Connected: ${client.id}`);
		client.emit('welcome', 'Hi to Server');

		client.on('disconnecting', () => {
		const customRooms = [...client.rooms].filter((room) => room !== client.id);
		console.log(`Client ${client.data.userId} is disconnecting from rooms:`);
		console.log(customRooms);

		customRooms.forEach((roomId) => {
			client.to(roomId).emit('user:left', {
			userId: client.data.userId,
			roomId,
			});
		});
		});
	}


	@SubscribeMessage('room:join')
	joinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string)
	{
		if (typeof roomId === 'string' && roomId.trim().length > 0)
		{
			client.join(roomId);
		}
	}

	@SubscribeMessage('chat:send')
	async messageToRoom(
	@ConnectedSocket() client: Socket,
	@MessageBody() data: { msg: string; roomId: string },
	@Ack() ack: (res: { status: string; data?: any; message?: string }) => void,
	) {
	if (!client.rooms.has(data.roomId)) {
		return {
			status: 'error',
			message: 'Invalid room ID: must be a non-empty string',
		};
		const message = "Invalid room ID: must be a non-empty string";
		ack({ status: 'error', data: message  });
		return;
	}

	try {
		const savedMessage = await this.messagesService.save({
			senderId: client.data.userId,
			roomId: data.roomId,
			text: data.msg,
		});

		client.to(data.roomId).emit('message', savedMessage);

		ack({ status: 'sent', data: savedMessage });
	} catch (error) {
		console.error(error);
		return {
			status: 'error',
			message: 'Failed to save message',
		};
	}
	}


	@SubscribeMessage('chat:history')
	handleChatHistory(@MessageBody() roomId: string)
	{
		
	}

}