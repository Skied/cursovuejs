import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {UserMessagesState} from '@/store/modules/user-messages/types';

const namespaced: boolean = true;

export const userMessagesModule: Module<UserMessagesState, RootState> = {
  namespaced,
};
