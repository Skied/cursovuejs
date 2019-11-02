import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from '@nestjs/common';
import {
  RegisterData,
  UserInRoomTypingData,
  UserReadMessage,
  UserRoomData,
  UserTypingData,
} from '../interfaces/socket-data.interfaces';
import {UserMessagesService} from './user-messages.service';
import {UserMessage} from '../entities/user-message';
import {RoomMessagesService} from './room-messages.service';
import {RoomMessage} from '../entities/room-message';
import {ChatEnums} from '../enums/chat.enums';
import {Room} from '../entities/room';
import {RoomsService} from './rooms.service';
import {UsersService} from './users.service';
import {User} from '../entities/user';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  // https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
  @WebSocketServer()
  server: Server;

  private socketIdToUserId: { [socketId: string]: number };
  private userIdToSocketId: { [userId: number]: string };
  private socketInRooms: { [socketId: string]: string[] };

  constructor(private readonly roomMessagesService: RoomMessagesService,
              private readonly roomsService: RoomsService,
              private readonly userMessagesService: UserMessagesService,
              private readonly userService: UsersService,
  ) {
    this.socketIdToUserId = {};
    this.userIdToSocketId = {};
    this.socketInRooms = {};
  }

  public afterInit(server: Server): any {
    Logger.log('Websocket initialized', EventsGateway.name);
  }

  public handleConnection(socket: Socket, ...args: any[]): any {
    Logger.log(`New socket '${socket.id}' connected`, EventsGateway.name);
    this.socketIdToUserId[socket.id] = null;
    this.socketInRooms[socket.id] = [];
    this.showNumSocketsConnected();
  }

  public handleDisconnect(socket: Socket): any {
    // Notify the rooms where the user was that he has left
    for (const roomIdStr of this.socketInRooms[socket.id]) {
      const idRoom: number = parseInt(roomIdStr, 10);
      this.server.sockets.in(roomIdStr).emit(ChatEnums.USER_LEFT_THE_ROOM, {
        idRoom,
        idUser: this.socketIdToUserId[socket.id],
      });
    }
    if (this.socketIdToUserId.hasOwnProperty(socket.id)) {
      const userId: number = this.socketIdToUserId[socket.id];
      delete this.socketIdToUserId[socket.id];
      delete this.socketInRooms[socket.id];
      delete this.userIdToSocketId[userId];
      this.server.emit(ChatEnums.USER_DISCONNECTED, {
        idUser: userId,
      });
    }
    this.showNumSocketsConnected();
    Logger.log(`Socket '${socket.id}' disconnected`, EventsGateway.name);
  }

  private showNumSocketsConnected() {
    const numSockets: number = Object.keys(this.socketIdToUserId).length;
    if (numSockets === 0) {
      Logger.log(`No users connected`, EventsGateway.name);
    } else if (numSockets === 1) {
      Logger.log(`There is ${numSockets} user connected`, EventsGateway.name);
    } else {
      Logger.log(`There are ${numSockets} users connected`, EventsGateway.name);
    }
  }

  @SubscribeMessage(ChatEnums.ASSOCIATE)
  private async associateClient(socket: Socket, registerData: RegisterData) {
    this.socketIdToUserId[socket.id] = registerData.idUser;
    this.userIdToSocketId[registerData.idUser] = socket.id;
    Logger.log(`Socket id ${socket.id} associated with user ${registerData.idUser}`, EventsGateway.name);
    // Send to users new user connected
    const user: User = await this.userService.findById(registerData.idUser);
    this.server.emit(ChatEnums.USER_CONNECTED, user);
    // Send to user connected users
    for (const socketId in this.socketIdToUserId) {
      if (this.socketIdToUserId.hasOwnProperty(socketId)) {
        if (this.socketIdToUserId[socketId] !== registerData.idUser) {
          socket.emit(ChatEnums.USER_CONNECTED, user);
        }
      }
    }
    // Send user-in-room to user
    const rooms: Room[] = await this.roomsService.getRooms();
    for (const room of rooms) {
      if (this.server.sockets.adapter.rooms.hasOwnProperty(room.id)) {
        for (const socketId in this.server.sockets.adapter.rooms[room.id].sockets) {
          if (this.server.sockets.adapter.rooms[room.id].sockets.hasOwnProperty(socketId)) {
            if (this.socketIdToUserId.hasOwnProperty(socketId)) {
              const userId: number = this.socketIdToUserId[socketId];
              socket.emit(ChatEnums.JOIN_USER_TO_THE_ROOM, {
                idRoom: room.id,
                idUser: userId,
              });
            }
          }
        }
      }
    }
  }

  @SubscribeMessage(ChatEnums.NEW_USER_MESSAGE)
  private async newUserMessage(socket: Socket, userMessage: UserMessage) {
    const newUserMessage: UserMessage = await this.userMessagesService.createUserMessage(userMessage);
    // Send message to sender
    socket.emit(ChatEnums.NEW_USER_MESSAGE, newUserMessage);
    if (this.userIdToSocketId.hasOwnProperty(newUserMessage.idReceiver)) {
      // Send message to receiver
      const receiverSocketId: string = this.userIdToSocketId[newUserMessage.idReceiver];
      socket.broadcast.to(receiverSocketId).emit(ChatEnums.NEW_USER_MESSAGE, newUserMessage);
    }
  }

  @SubscribeMessage(ChatEnums.NEW_ROOM_MESSAGE)
  private async newRoomMessage(socket: Socket, roomMessage: RoomMessage) {
    const newRoomMessage: RoomMessage = await this.roomMessagesService.creteRoomMessage(roomMessage);
    // Sent message to room
    const roomIdStr: string = newRoomMessage.idRoom.toString();
    this.server.sockets.in(roomIdStr).emit(ChatEnums.NEW_ROOM_MESSAGE, newRoomMessage);
  }

  @SubscribeMessage(ChatEnums.JOIN_USER_TO_THE_ROOM)
  private async joinUserToTheRoom(socket: Socket, userRoomData: UserRoomData) {
    const roomIdStr: string = userRoomData.idRoom.toString();
    socket.join(roomIdStr);
    this.socketInRooms[socket.id].push(roomIdStr);
    // Notify user join to the room
    this.server.emit(ChatEnums.JOIN_USER_TO_THE_ROOM, userRoomData);
  }

  @SubscribeMessage(ChatEnums.USER_LEFT_THE_ROOM)
  private async userLeftTheRoom(socket: Socket, userRoomData: UserRoomData) {
    const roomIdStr: string = userRoomData.idRoom.toString();
    socket.leave(roomIdStr);
    const index: number = this.socketInRooms[socket.id].indexOf(roomIdStr);
    if (index > -1) {
      this.socketInRooms[socket.id].splice(index, 1);
    }
    // Notify user left the room
    this.server.emit(ChatEnums.USER_LEFT_THE_ROOM, userRoomData);
  }

  @SubscribeMessage(ChatEnums.USER_IS_TYPING)
  private async userIsTyping(socket: Socket, userTypingData: UserTypingData) {
    if (this.userIdToSocketId.hasOwnProperty(userTypingData.idReceiver)) {
      const socketFriendId: string = this.userIdToSocketId[userTypingData.idReceiver];
      // Notify the user that the friend is typing
      socket.broadcast.to(socketFriendId).emit(ChatEnums.USER_IS_TYPING, userTypingData);
    }
  }

  @SubscribeMessage(ChatEnums.USER_IN_ROOM_IS_TYPING)
  private async userInRoomIsTyping(socket: Socket, userInRoomTypingData: UserInRoomTypingData) {
    const roomIdStr: string = userInRoomTypingData.idRoom.toString();
    // Notify users that there is a user typing
    this.server.sockets.in(roomIdStr).emit(ChatEnums.USER_IN_ROOM_IS_TYPING, userInRoomTypingData);
  }

  @SubscribeMessage(ChatEnums.USER_READ_MESSAGE)
  private async userReadMessage(socket: Socket, userReadMessage: UserReadMessage) {
    const userMessage: UserMessage = await this.userMessagesService.updateUserMessageAsRead(userReadMessage.idMessage);
    this.server.sockets.connected[socket.id].emit(ChatEnums.USER_READ_MESSAGE, userMessage);
    if (this.userIdToSocketId.hasOwnProperty(userMessage.idSender)) {
      const senderSocketId: string = this.userIdToSocketId[userMessage.idSender];
      this.server.sockets.connected[senderSocketId].emit(ChatEnums.USER_READ_MESSAGE, userMessage);
    }
  }

}
