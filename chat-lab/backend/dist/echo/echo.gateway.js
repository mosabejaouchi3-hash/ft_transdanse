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
let EchoGateway = class EchoGateway {
    server;
    afterInit(server) {
    }
    handleConnection(client) {
        console.log(client.id);
        client.emit("welcome", "Hi to Server");
    }
    handleDisconnect(client, reason) {
        console.log("Disconnected Client");
    }
    connectedClient(client, data) {
        console.log("hello");
        console.log(data);
    }
    echo(client, data) {
        console.log("echo");
        console.log(data);
        client.emit("echo", data);
    }
    handleReturn(data) {
        console.log("ack:return");
        return data;
    }
    handleAck(data, ack) {
        console.log("ack:manual");
        ack({ status: 'received', data });
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], EchoGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage('hello'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], EchoGateway.prototype, "connectedClient", null);
__decorate([
    SubscribeMessage('echo'),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], EchoGateway.prototype, "echo", null);
__decorate([
    SubscribeMessage('ack:return'),
    __param(0, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EchoGateway.prototype, "handleReturn", null);
__decorate([
    SubscribeMessage('ack:manual'),
    __param(0, MessageBody()),
    __param(1, Ack()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], EchoGateway.prototype, "handleAck", null);
EchoGateway = __decorate([
    WebSocketGateway()
], EchoGateway);
export { EchoGateway };
//# sourceMappingURL=echo.gateway.js.map