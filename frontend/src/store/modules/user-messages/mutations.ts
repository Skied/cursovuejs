import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import { UserMessage } from '@/classes/user-message';
import { EventBus } from '../../../services/event-bus';
import { UserMessagesState } from '@/store/modules/user-messages/types';

export const mutations: MutationTree<UserMessagesState> = {
  setMessages: (state: UserMessagesState, message: UserMessage[]) => {
    state.messages = message;
    EventBus.$emit('messagesLoaded', true);
  },
  setNewMessages: (state: UserMessagesState, messages: UserMessage[]) => {
    const newState: {[idSender: number]: UserMessage[]} = {};

    if (messages && messages.length) {
      messages.map(item => item.idSender).forEach(id => {
        if (id) {
          newState[id] = messages.filter(item => item.idSender === id);
        }
      });
    }
    state.newMessages = newState;
  }
};
