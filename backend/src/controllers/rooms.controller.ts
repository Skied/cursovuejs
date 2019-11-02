import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUseTags,
} from '@nestjs/swagger';
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
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ErrorResponseDto} from '../dtos/error-response.dto';
import {Room} from '../entities/room';
import {RoomsService} from '../services/rooms.service';

@ApiUseTags('rooms')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('rooms')
@UseInterceptors(ClassSerializerInterceptor)
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) {
  }

  @Get()
  @ApiCreatedResponse({description: 'Room list.', type: Room, isArray: true})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public getUsers(): Promise<Room[]> {
    return this.roomsService.getRooms();
  }

  @Post()
  @ApiCreatedResponse({description: 'New room.', type: Room})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public createRoom(@Body() room: Room): Promise<Room> {
    return this.roomsService.createRoom(room);
  }

  @Delete(':idRoom')
  @ApiCreatedResponse({description: 'Room list.', type: Room, isArray: false})
  @ApiNotFoundResponse({description: 'Room not found', type: ErrorResponseDto})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async deleteUser(@Param('idRoom', new ParseIntPipe()) idRoom: number): Promise<Room> {
    const room: Room | undefined = await this.roomsService.findById(idRoom);
    if (room) {
      return this.roomsService.deleteRoom(idRoom);
    } else {
      throw new HttpException('Invalid data', HttpStatus.NOT_FOUND);
    }
  }

  @Put()
  @ApiCreatedResponse({description: 'Updated room.', type: Room, isArray: false})
  @ApiNotFoundResponse({description: 'Room not found', type: ErrorResponseDto})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public async updateUser(@Body() room: Room): Promise<Room> {
    const userDb: Room | undefined = await this.roomsService.findById(room.id);
    if (userDb) {
      return this.roomsService.updateRoom(room);
    } else {
      throw new HttpException('Invalid data', HttpStatus.NOT_FOUND);
    }
  }

}
