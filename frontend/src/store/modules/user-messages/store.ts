import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {UserMessagesState} from '@/store/modules/user-messages/types';
import {mutations} from '@/store/modules/user-messages/mutations';
import {state} from '@/store/modules/user-messages/state';
import {actions} from '@/store/modules/user-messages/actions';

const namespaced: boolean = true;

export const userMessagesModule: Module<UserMessagesState, RootState> = {
  namespaced,
  getters: {},
  state,
  actions,
  mutations,
};
