import {AxiosResponse} from 'axios';
import {RoomMessage} from '@/classes/room-message';
import {UserInRoomTypingData, UserRoomData} from '@/interfaces/socket-data.interface';
import {HttpClient} from '@/services/http-client.service';

class RoomMessagesService {

  private readonly baseEndPoint: string = '/room-messages';

  public getRoomMessages(idRoom: number): Promise<AxiosResponse<RoomMessage[]>> {
    return HttpClient.get<RoomMessage[]>(this.baseEndPoint + `/${idRoom}`);
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
