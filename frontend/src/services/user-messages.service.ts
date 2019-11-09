import {AxiosResponse} from 'axios';
import {HttpClient} from '@/services/http-client.service';
import {UserMessage} from '@/classes/user-message';
import $socket from '@/socket-instance';
import {ChatEnums} from '@/enums/chat.enums';
import {UserReadMessage, UserTypingData} from '@/interfaces/socket-data.interface';

class UserMessagesService {

  private readonly baseEndPoint: string = '/user-messages';

  public getUserMessages(idUser: number): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get<UserMessage[]>(this.baseEndPoint + `/${idUser}`);
  }

  public getNewMessages(): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get<UserMessage[]>(this.baseEndPoint + `/news`);
  }

  public sendUserMessage(userMessage: UserMessage): void {
  }

  public userTyping(userTypingData: UserTypingData): void {
  }

  public userReadMessage(userReadMessage: UserReadMessage): void {
  }

}

export const userMessagesService: UserMessagesService = new UserMessagesService();
