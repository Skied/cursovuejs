import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {User} from '../entities/user';
import {UsersService} from '../services/users.service';
import {AuthGuard} from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {ErrorResponseDto} from '../dtos/error-response.dto';

@ApiUseTags('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @ApiCreatedResponse({description: 'User list.', type: User, isArray: true})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Delete(':idUser')
  @ApiCreatedResponse({description: 'User list.', type: User, isArray: false})
  @ApiNotFoundResponse({description: 'User not found', type: ErrorResponseDto})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async deleteUser(@Param('idUser', new ParseIntPipe()) idUser: number): Promise<User> {
    const user: User | undefined = await this.usersService.findById(idUser);
    if (user) {
      return this.usersService.deleteUser(idUser);
    } else {
      throw new HttpException('Invalid data', HttpStatus.NOT_FOUND);
    }
  }

  @Put()
  @ApiCreatedResponse({description: 'Updated user.', type: User, isArray: false})
  @ApiNotFoundResponse({description: 'User not found', type: ErrorResponseDto})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async updateUser(@Body() user: User): Promise<User> {
    const userDb: User | undefined = await this.usersService.findById(user.id);
    if (userDb) {
      return this.usersService.updateUser(user);
    } else {
      throw new HttpException('Invalid data', HttpStatus.NOT_FOUND);
    }
  }

}
