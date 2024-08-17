import { OnModuleInit, Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

type SocketToGroup = {
  socket: Socket;
  groupId: number;
};

let socketGroupList: SocketToGroup[] = [];

@WebSocketGateway()
@Injectable()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      const newGroup: SocketToGroup = { socket, groupId: 0 };
      socketGroupList.push(newGroup);

      socket.on('newMessage', async (body: any) => {
        if (body.groupId && Object.keys(body).length == 1) {
          const socketGroup = socketGroupList.find(
            (socketForGroup) => socketForGroup.socket.id === socket.id,
          );
          if (socketGroup) {
            socketGroup.groupId = body.groupId;
          }
        } else {
          const savedMessage = await this.messagesService.create(body);
          const sendMessage = {
            id: savedMessage.id,
            text: savedMessage.data,
            time: savedMessage.time,
            senderusername: savedMessage.user.username,
            groupId: savedMessage.group.id,
          };
          socketGroupList
            .filter(
              (socketForGroup) =>
                socketForGroup.groupId === sendMessage.groupId,
            )
            .forEach((socketInGroup) => {
              socketInGroup.socket.emit('onMessage', {
                content: sendMessage,
              });
            });
        }
      });

      socket.on('disconnect', () => {
        socketGroupList = socketGroupList.filter(
          (list) => list.socket.id !== socket.id,
        );
      });
    });
  }
}
