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
import { CHAT_EVENTS } from './events.js';


@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

	constructor(private readonly messagesService: MessagesService) { }

	@WebSocketServer()
	server: Server;
	private activeUsers = new Map<string, Set<string>>();

	afterInit(server: Server)
	{

	}

	handleDisconnect(client: Socket, reason?: string) {
		console.log(reason);
	}



	handleConnection(client: Socket) {
		client.data.userId = client.handshake.auth.userId;
		if (this.activeUsers.has(client.data.userId))
		{
			this.activeUsers.get(client.data.userId)?.add(client.id);
		}
		else
		{
			this.activeUsers.set(client.data.userId, new Set([client.id]));
			this.server.emit(CHAT_EVENTS.PRESENCE_UPDATE, {
					userId: client.data.userId,
					status: 'online',
				});
		}

		console.log(`Connected: ${client.id}`);
		client.emit('welcome', 'Hi to Server');

		client.on('disconnecting', () => {
		const customRooms = [...client.rooms].filter((room) => room !== client.id);

		if (this.activeUsers.has(client.data.userId))
		{
			if (this.activeUsers.get(client.data.userId)?.size === 1)
			{
				this.activeUsers.delete(client.data.userId);
				this.server.emit(CHAT_EVENTS.PRESENCE_UPDATE, {
					userId: client.data.userId,
					status: 'offline',
				});
			}
			else
			{
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

	@SubscribeMessage(CHAT_EVENTS.PRESENCE_LIST)
	presenceList(@Ack() ack: ( res: {status: string, data: any} ) => void)
	{
		ack({status: "ok", data: Array.from(this.activeUsers.keys()) });
	}

	@SubscribeMessage(CHAT_EVENTS.ROOM_JOIN)
	joinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string)
	{
		if (typeof roomId === 'string' && roomId.trim().length > 0)
		{
			client.join(roomId);
		}
	}

	@SubscribeMessage(CHAT_EVENTS.CHAT_SEND)
	async messageToRoom(
	@ConnectedSocket() client: Socket,
	@MessageBody() data: { msg: string; roomId: string },
	@Ack() ack: (res: { status: string; data?: any; message?: string }) => void,
	) {
	if (!client.rooms.has(data.roomId)) {
		ack({status: 'error', message: 'Unauthorized: client is not in room'});
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
	} catch (error) {
		console.error(error);
		ack({status: 'error', message: 'Failed to save message'});
	}
	}


	@SubscribeMessage(CHAT_EVENTS.CHAT_HISTORY)
	async handleChatHistory(@ConnectedSocket() client: Socket,
	@MessageBody() roomId: string,
	@Ack() ack: (res: { status: string; data?: any; message?: string }) => void)
	{
		if (!client.rooms.has(roomId)) {
			ack({status: 'error', message: 'Unauthorized: client is not in room'});
			return;
		}
		try {
			const ChatHistory = await this.messagesService.findByRoom(roomId);

			ack({ status: 'sent', data: ChatHistory });
		} catch (error) {
			console.error(error);
			ack({status: 'error', message: 'Failed to save message'});
		}
	}

}