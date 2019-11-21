import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import {UserMessagesState} from '@/store/modules/user-messages/types';
import {UserMessage} from '@/classes/user-message';
import {EventBus} from '@/services/event-bus';
import { ChatEnums } from '@/enums/chat.enums';
import { State } from 'vuex-class';
import { User } from '@/classes/user';
import store from '@/store';
import router from '@/router';


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
  [ChatEnums.SOCKET_NEW_USER_MESSAGE](state: UserMessagesState, userMessage: UserMessage) {
    if(store.state.user!.id !== userMessage.idSender) {
      if (!state.newMessages.hasOwnProperty(userMessage.idSender!)) {
        Vue.set(state.newMessages, userMessage.idSender!, []);
      }
      state.newMessages[userMessage.idSender!].push(userMessage);
    }
    if (router.app.$route.name === 'chat') {
      state.messages.push(userMessage);
      EventBus.$emit('newUserMessage', userMessage);
    }
  },
  [ChatEnums.SOCKET_USER_READ_MESSAGE](state: UserMessagesState, userMessage: UserMessage) {
    if(state.newMessages.hasOwnProperty(userMessage.idSender!)) {
      const index: number = state.newMessages[userMessage.idSender!].findIndex(mes => mes.id === userMessage.id);
      if (index > -1) {
        Vue.delete(state.newMessages[userMessage.idSender!], index);
      }
    }
    if (router.app.$route.name === 'chat') {
      const idx: number = state.messages.findIndex(item => item.id === userMessage.id);
      if(idx > -1) {
        Vue.set(state.messages, idx, userMessage);
      }
    }

  }
};
