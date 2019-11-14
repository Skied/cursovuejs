import {User} from '@/classes/user';
import {AxiosResponse} from 'axios';
import { HttpClient } from './http-client.service';

class UsersService {

  private readonly baseEndPoint: string = '/users';

  // @ts-ignore
  public getUsers(): Promise<AxiosResponse<User[]>> {
    return HttpClient.get(this.baseEndPoint);
  }

  // @ts-ignore
  public updateUser(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.put(this.baseEndPoint, user);
  }

  // @ts-ignore
  public deleteUser(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.delete(this.baseEndPoint + '/' + user.id);
  }

}

export const usersService: UsersService = new UsersService();
