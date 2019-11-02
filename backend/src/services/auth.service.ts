import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from './users.service';
import {User} from '../entities/user';
import {UserPayloadInterface} from '../interfaces/user-payload.interface';
import {AccessTokenDto} from '../dtos/access-token.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) {
  }

  public async login(username: string, password: string): Promise<AccessTokenDto> {
    const user: User = await this.usersService.findByUsername(username);
    if (user) {
      const validPassword: boolean = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const payload: UserPayloadInterface = {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}
