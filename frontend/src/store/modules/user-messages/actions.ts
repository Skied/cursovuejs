import {ActionTree} from 'vuex';
import {RootState} from '@/store/types';
import { UserMessagesState } from '@/store/modules/user-messages/types';
import { userMessagesService } from '../../../services/user-messages.service';
import { UserMessage } from '@/classes/user-message';

export const actions: ActionTree<UserMessagesState, RootState> = {
  getMessages: (context: any, idUser: number) => {
    userMessagesService.getUserMessages(idUser).then((messages: UserMessage[]) => {
      context.commit('setMessages', messages);
    });
  },
  getNewMessages: (context: any) => {
    userMessagesService.getNewMessages().then( (messages: UserMessage[]) => {
      context.commit('setNewMessages', messages);
    });
  }

};
