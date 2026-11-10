Event Name
    room:join
    chat:send
    chat:message
    chat:history
    user:left

Direction:
    Client To Server
    Client To Server
    Server To Client
    Client To Server
    Server To Client


Payload
    string (e.g., 'room1')
    { roomId: string; msg: string }
    ChatMessage
    { roomId: string }
    { userId: string; roomId: string }


Acknowledgement Response:
    { status: 'ok' | 'error', message?: string }
    { status: 'ok' | 'error', data?: ChatMessage, message?: string }
    None (Broadcast to room)
    { status: 'ok' | 'error', data?: ChatMessage[], message?: string }
    None (Broadcast on disconnect)