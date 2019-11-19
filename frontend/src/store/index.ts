import Vue from 'vue';
import Vuex from 'vuex';
import {RootState} from '@/store/types';
import {usersModule} from '@/store/modules/users/store';
import {userMessagesModule} from '@/store/modules/user-messages/store';
import {roomsModule} from '@/store/modules/rooms/store';
import { RoleEnum } from '@/enums/role.enum';
import { User } from '@/classes/user';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    user: null
  },
  getters: {
    userIsAdmin: (state: RootState) => state.user && state.user.role === RoleEnum.Admin
  },
  mutations: {
    setUser: (state: RootState, newUser: User) => state.user = newUser
  },
  actions: {
    getAllData: (context: any) => {
      context.dispatch('usersModule/getUsers');
      context.dispatch('userMessagesModule/getNewMessages');
      context.dispatch('roomsModule/getRooms');
    }
  },
  modules: {
    usersModule,
    userMessagesModule,
    roomsModule
  }
});
