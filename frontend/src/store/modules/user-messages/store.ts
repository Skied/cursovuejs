import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {UserMessagesState} from '@/store/modules/user-messages/types';

import {state} from '@/store/modules/user-messages/state';
import {actions} from '@/store/modules/user-messages/actions';
import {mutations} from '@/store/modules/user-messages/mutations';


const namespaced: boolean = true;

export const userMessagesModule: Module<UserMessagesState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};
