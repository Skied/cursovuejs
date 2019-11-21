import {AxiosResponse} from 'axios';
import {HttpClient} from '@/services/http-client.service';
import {UserMessage} from '@/classes/user-message';
import {ChatEnums} from '@/enums/chat.enums';
import {UserReadMessage, UserTypingData} from '@/interfaces/socket-data.interface';
import socket from '@/socket-instance';

class UserMessagesService {

  private readonly baseEndPoint: string = '/user-messages';

  public getUserMessages(idUser: number): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get<UserMessage[]>(this.baseEndPoint + `/${idUser}`);
  }

  public getNewMessages(): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get<UserMessage[]>(this.baseEndPoint + `/news`);
  }

  public sendUserMessage(userMessage: UserMessage): void {
    socket.emit(ChatEnums.NEW_USER_MESSAGE, userMessage);
  }

  public userTyping(userTypingData: UserTypingData): void {
    socket.emit(ChatEnums.USER_IS_TYPING, userTypingData);
  }

  public userReadMessage(userReadMessage: UserReadMessage): void {
    socket.emit(ChatEnums.USER_READ_MESSAGE, userReadMessage);
  }

}

export const userMessagesService: UserMessagesService = new UserMessagesService();
