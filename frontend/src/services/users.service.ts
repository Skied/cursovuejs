import {User} from '@/classes/user';
import {AxiosResponse} from 'axios';
import {HttpClient} from '@/services/http-client.service';

class UsersService {

  private readonly baseEndPoint: string = '/users';

  public getUsers(): Promise<AxiosResponse<User[]>> {
    return HttpClient.get<User[]>(this.baseEndPoint);
  }

  public updateUser(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.put<User>(this.baseEndPoint, user);
  }

  public deleteUser(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.delete<User>(this.baseEndPoint + `/${user.id}`);
  }

}

export const usersService: UsersService = new UsersService();
