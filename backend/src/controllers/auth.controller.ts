import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {LoginDto} from '../dtos/login.dto';
import {ApiCreatedResponse, ApiForbiddenResponse, ApiUseTags} from '@nestjs/swagger';
import {AccessTokenDto} from '../dtos/access-token.dto';
import {ErrorResponseDto} from '../dtos/error-response.dto';
import {UsersService} from '../services/users.service';
import {User} from '../entities/user';

@ApiUseTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService) {
  }

  @Post('login')
  @ApiCreatedResponse({description: 'Correct login.', type: AccessTokenDto})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async login(@Body() body: LoginDto): Promise<AccessTokenDto> {
    const accessTokenDto: AccessTokenDto = await this.authService.login(body.username, body.password);
    if (accessTokenDto != null) {
      return accessTokenDto;
    } else {
      throw new HttpException('Invalid data', HttpStatus.FORBIDDEN);
    }
  }

  @Post('register')
  @ApiCreatedResponse({description: 'New user.', type: User})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async register(@Body() user: User): Promise<User> {
    let userDB: User | undefined = await this.usersService.findByUsername(user.username);
    if (userDB) {
      throw new HttpException('A user with this username already exists', HttpStatus.CONFLICT);
    }
    userDB = await this.usersService.findByEmail(user.email);
    if (userDB) {
      throw new HttpException('A user with this email already exists', HttpStatus.CONFLICT);
    }
    return this.usersService.createUser(user);
  }

}
