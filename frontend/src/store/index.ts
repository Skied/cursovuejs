import Vue from 'vue';
import Vuex from 'vuex';
import {RootState} from '@/store/types';
import {usersModule} from '@/store/modules/users/store';
import {RoleEnum} from '@/enums/role.enum';
import {User} from '@/classes/user';
import {userMessagesModule} from '@/store/modules/user-messages/store';
import {roomsModule} from '@/store/modules/rooms/store';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    user: null,
  },
  getters: {
    userIsAdmin: (state: RootState): boolean => {
      return state.user != null && state.user.role === RoleEnum.Admin;
    },
  },
  mutations: {
    setUser(state: RootState, user: User) {
      state.user = user;
    },
  },
  actions: {
    getAllData: ({dispatch}) => {
      dispatch('usersModule/getUsers');
      dispatch('roomsModule/getRooms');
      dispatch('userMessagesModule/getNewMessages');
    },
  },
  modules: {
    roomsModule,
    userMessagesModule,
    usersModule,
  },
});
