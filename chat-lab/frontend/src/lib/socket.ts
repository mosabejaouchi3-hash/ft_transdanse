import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://super-duper-space-lamp-4jx5r4r5xxpxh7x5v-3001.app.github.dev/';

console.log(URL);

export const socket: Socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});