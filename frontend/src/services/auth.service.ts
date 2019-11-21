import {AxiosResponse} from 'axios';
import {LoginDto} from '@/dtos/login.dto';
import {AccessTokenDto} from '@/dtos/access-token.dto';
import {User} from '@/classes/user';
import router from '@/router';
import {HttpClient} from '@/services/http-client.service';
import socket from '@/socket-instance';
import { ChatEnums } from '@/enums/chat.enums';
import store from '@/store';

class AuthService {

  private readonly baseEndPoint: string = '/auth';

  public login(loginDto: LoginDto): Promise<AxiosResponse<AccessTokenDto>> {
    return HttpClient.post<AccessTokenDto>(this.baseEndPoint + '/login', loginDto);
  }

  public register(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.post<User>(this.baseEndPoint + '/register', user);
  }

  public associate(): void {
    const userLogged = store.state.user;
    const data = {idUser: userLogged ? userLogged.id : 0};
    socket.emit(ChatEnums.ASSOCIATE, data);
  }

  public logout(): void {
    localStorage.clear();
    router.push('/login');
  }

}

export const authService: AuthService = new AuthService();
