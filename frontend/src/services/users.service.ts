import {User} from '@/classes/user';
import {AxiosResponse} from 'axios';

class UsersService {

  private readonly baseEndPoint: string = '/users';

  // @ts-ignore
  public getUsers(): Promise<AxiosResponse<User[]>> {
  }

  // @ts-ignore
  public updateUser(user: User): Promise<AxiosResponse<User>> {
  }

  // @ts-ignore
  public deleteUser(user: User): Promise<AxiosResponse<User>> {
  }

}

export const usersService: UsersService = new UsersService();
