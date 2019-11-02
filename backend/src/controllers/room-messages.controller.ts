import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiUseTags} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RoomMessagesService} from '../services/room-messages.service';
import {ErrorResponseDto} from '../dtos/error-response.dto';
import {RoomMessage} from '../entities/room-message';

@ApiUseTags('room-messages')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('room-messages')
@UseInterceptors(ClassSerializerInterceptor)
export class RoomMessagesController {

  constructor(private readonly roomMessagesService: RoomMessagesService) {

  }

  @Get(':idRoom')
  @ApiCreatedResponse({description: 'Room list.', type: RoomMessage, isArray: true})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public getPrivateMessages(
    @Param('idRoom', new ParseIntPipe()) idRoom: number,
  ): Promise<RoomMessage[]> {
    return this.roomMessagesService.getRoomMessages(idRoom);
  }

}
