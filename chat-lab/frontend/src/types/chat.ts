
export interface iMessageItem {
    id?: string;
    roomId: string;
    senderId: string;
    content: string;
    createdAt?: string;
}

export interface iSocketAck<T = any> {
    status: 'ok' | 'error';
    data?: T;
    message?: string;
}
