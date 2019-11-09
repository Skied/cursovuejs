import {ActionTree} from 'vuex';
import {UserMessagesState} from '@/store/modules/user-messages/types';
import {RootState} from '@/store/types';
import {userMessagesService} from '@/services/user-messages.service';
import {UserMessage} from '@/classes/user-message';
import {AxiosResponse} from 'axios';

export const actions: ActionTree<UserMessagesState, RootState> = {
  getMessages({commit}, idFriend: number): void {
    userMessagesService.getUserMessages(idFriend).then((axiosResponse: AxiosResponse<UserMessage[]>) => {
      if (axiosResponse.status === 200) {
        commit('setMessages', axiosResponse.data);
      }
    });
  },
  getNewMessages({commit}): void {
    userMessagesService.getNewMessages().then((axiosResponse: AxiosResponse<UserMessage[]>) => {
      if (axiosResponse.status === 200) {
        commit('setNewMessages', axiosResponse.data);
      }
    }).catch((error: AxiosResponse) => {
      commit('newMessagesError');
    });
  },
};
