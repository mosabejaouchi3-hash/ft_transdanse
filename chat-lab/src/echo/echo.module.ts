
import { Module } from '@nestjs/common';
import { EchoGateway } from './echo.gateway.js';

@Module({
  providers: [EchoGateway]
})
export class EventsModule {}
