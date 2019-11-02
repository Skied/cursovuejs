import {AxiosResponse} from 'axios';
import {Room} from '@/classes/room';

class RoomsService {

  private readonly baseEndPoint: string = '/rooms';

  // @ts-ignore
  public getRooms(): Promise<AxiosResponse<Room[]>> {
  }

  // @ts-ignore
  public createRoom(room: Room): Promise<AxiosResponse<Room>> {
  }

  // @ts-ignore
  public updateRoom(room: Room): Promise<AxiosResponse<Room>> {
  }

  // @ts-ignore
  public deleteRoom(room: Room): Promise<AxiosResponse<Room>> {
  }

}

export const roomsService: RoomsService = new RoomsService();
