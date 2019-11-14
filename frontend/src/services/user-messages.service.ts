import {AxiosResponse} from 'axios';
import {HttpClient} from '@/services/http-client.service';
import {UserMessage} from '@/classes/user-message';
import $socket from '@/socket-instance';
import {ChatEnums} from '@/enums/chat.enums';
import {UserReadMessage, UserTypingData} from '@/interfaces/socket-data.interface';

class UserMessagesService {

  private readonly baseEndPoint: string = '/user-messages';

  // @ts-ignore
  public getUserMessages(idUser: number): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get(this.baseEndPoint + '/' + idUser);
  }

  // @ts-ignore
  public getNewMessages(): Promise<AxiosResponse<UserMessage[]>> {
    return HttpClient.get(this.baseEndPoint + '/news');
  }

  public sendUserMessage(userMessage: UserMessage): void {
  }

  public userTyping(userTypingData: UserTypingData): void {
  }

  public userReadMessage(userReadMessage: UserReadMessage): void {
  }

}

export const userMessagesService: UserMessagesService = new UserMessagesService();
