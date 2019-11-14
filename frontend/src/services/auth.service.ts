import {AxiosResponse} from 'axios';
import {LoginDto} from '@/dtos/login.dto';
import {AccessTokenDto} from '@/dtos/access-token.dto';
import {User} from '@/classes/user';
import router from '@/router';
import { HttpClient } from '@/services/http-client.service';

class AuthService {

  private readonly baseEndPoint: string = '/auth';

  // @ts-ignore
  public login(loginDto: LoginDto): Promise<AxiosResponse<AccessTokenDto>> {
    HttpClient.post<LoginDto>(this.baseEndPoint + '/login', loginDto).then(
      (response: AccessTokenDto) => {
          localStorage.setItem('token', response.accessToken);
          router.push({path: '/'});
      }
    );
  }

  // @ts-ignore
  public register(user: User): Promise<AxiosResponse<User>> {
    return HttpClient.post<User>(this.baseEndPoint + '/register', user);
  }

  public associate(): void {
  }

  public logout(): void {
    localStorage.clear();
    router.push('login');
  }

}

export const authService: AuthService = new AuthService();
