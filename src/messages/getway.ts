import { OnModuleInit, Injectable } from '@nestjs/common';
import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { group } from 'console';

@WebSocketGateway()
@Injectable()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`Connected: ${socket.id}`);

      socket.on('newMessage', async (body: any) => {
        console.log('Received message:', body);

        const savedMessage = await this.messagesService.create(body);
        const sendMessage = {
          id: savedMessage.id,
          text: savedMessage.data,
          time: savedMessage.time,
          senderusername: savedMessage.user.username,
          groupId: savedMessage.group.id,
        };
        console.log(sendMessage);
        socket.emit('onMessage', {
          content: sendMessage,
        });
        socket.broadcast.emit('onMessage', {
          content: sendMessage,
        });
      });

      socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
      });
    });
  }
}
