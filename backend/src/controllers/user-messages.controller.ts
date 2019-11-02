import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiUseTags} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UserMessagesService} from '../services/user-messages.service';
import {ErrorResponseDto} from '../dtos/error-response.dto';
import {UserMessage} from '../entities/user-message';

@ApiUseTags('user-messages')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('user-messages')
@UseInterceptors(ClassSerializerInterceptor)
export class UserMessagesController {

  constructor(private readonly userMessagesService: UserMessagesService) {
  }

  @Get('news')
  @ApiCreatedResponse({description: 'Room list.', type: UserMessage, isArray: true})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public getNewMessages(
    @Req() request: any,
  ): Promise<UserMessage[]> {
    return this.userMessagesService.getNewMessages(request.user.id);
  }

  @Get(':idUser')
  @ApiCreatedResponse({description: 'Room list.', type: UserMessage, isArray: true})
  @ApiForbiddenResponse({description: 'Forbidden.', type: ErrorResponseDto})
  public getPrivateMessages(
    @Req() request: any,
    @Param('idUser', new ParseIntPipe()) idUser: number,
  ): Promise<UserMessage[]> {
    return this.userMessagesService.getPrivateMessages(request.user.id, idUser);
  }

}
