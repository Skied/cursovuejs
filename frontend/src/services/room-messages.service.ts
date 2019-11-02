import {AxiosResponse} from 'axios';
import {RoomMessage} from '@/classes/room-message';
import {UserInRoomTypingData, UserRoomData} from '@/interfaces/socket-data.interface';

class RoomMessagesService {

  private readonly baseEndPoint: string = '/room-messages';

  // @ts-ignore
  public getRoomMessages(idRoom: number): Promise<AxiosResponse<RoomMessage[]>> {
  }

  public joinRoom(userRoomData: UserRoomData): void {
  }

  public leftRoom(userRoomData: UserRoomData): void {
  }

  public sendRoomMessage(roomMessage: RoomMessage): void {
  }

  public userInRoomTyping(userInRoomTypingData: UserInRoomTypingData): void {
  }

}

export const roomMessagesService: RoomMessagesService = new RoomMessagesService();
