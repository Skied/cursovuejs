import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import {UserMessagesState} from '@/store/modules/user-messages/types';
import {UserMessage} from '@/classes/user-message';
import {EventBus} from '@/services/event-bus';

export const mutations: MutationTree<UserMessagesState> = {
  setMessages: (state: UserMessagesState, messages: UserMessage[]) => {
    state.messages = messages;
    EventBus.$emit('messagesLoaded', null);
  },
  setNewMessages: (state: UserMessagesState, messages: UserMessage[]) => {
    messages.forEach((message: UserMessage) => {
      if (!state.newMessages.hasOwnProperty(message.idSender!)) {
        Vue.set(state.newMessages, message.idSender!, []);
      }
      state.newMessages[message.idSender!].push(message);
    });
  },
  newMessagesError: (state: UserMessagesState) => {
    state.newMessages = {};
  },
};
