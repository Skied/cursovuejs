import {Module} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {state} from '@/store/modules/users/state';
import {getters} from '@/store/modules/users/getters';
import {actions} from '@/store/modules/users/actions';
import {mutations} from '@/store/modules/users/mutations';

const namespaced: boolean = true;

export const usersModule: Module<UsersState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
