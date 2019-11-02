import {AxiosResponse} from 'axios';
import {LoginDto} from '@/dtos/login.dto';
import {AccessTokenDto} from '@/dtos/access-token.dto';
import {User} from '@/classes/user';

class AuthService {

  private readonly baseEndPoint: string = '/auth';

  // @ts-ignore
  public login(loginDto: LoginDto): Promise<AxiosResponse<AccessTokenDto>> {
  }

  // @ts-ignore
  public register(user: User): Promise<AxiosResponse<User>> {
  }

  public associate(): void {
  }

  public logout(): void {
  }

}

export const authService: AuthService = new AuthService();
