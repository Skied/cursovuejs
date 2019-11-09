import {AxiosResponse} from 'axios';
import {Room} from '@/classes/room';
import {HttpClient} from '@/services/http-client.service';

class RoomsService {

  private readonly baseEndPoint: string = '/rooms';

  public getRooms(): Promise<AxiosResponse<Room[]>> {
    return HttpClient.get<Room[]>(this.baseEndPoint);
  }

  public createRoom(room: Room): Promise<AxiosResponse<Room>> {
    return HttpClient.post<Room>(this.baseEndPoint, room);
  }

  public updateRoom(room: Room): Promise<AxiosResponse<Room>> {
    return HttpClient.put<Room>(this.baseEndPoint, room);
  }

  public deleteRoom(room: Room): Promise<AxiosResponse<Room>> {
    return HttpClient.delete<Room>(this.baseEndPoint + `/${room.id}`);
  }

}

export const roomsService: RoomsService = new RoomsService();
