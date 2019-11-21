import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {User} from '@/classes/user';
import {ChatEnums} from '@/enums/chat.enums';
import {UserDisconnected} from '@/interfaces/socket-data.interface';
import { UserMessage } from '@/classes/user-message';

export const mutations: MutationTree<UsersState> = {
  usersLoaded(state: UsersState, users: User[]) {
    state.users = {};
    users.forEach((user: User) => {
      state.users[user.id] = user;
    });
  },
  usersError(state: UsersState) {
    state.users = {};
  },
  updateUser(state: UsersState, user: User) {
    if (state.users.hasOwnProperty(user.id!)) {
      Vue.set(state.users, user.id!, user);
    }
  },
  deleteUser(state: UsersState, user: User) {
    if (state.users.hasOwnProperty(user.id!)) {
      Vue.delete(state.users, user.id!);
    }
  },
  [ChatEnums.SOCKET_USER_CONNECTED](state: UsersState, user: User) {
    state.users[user.id] = user;
    if (state.connectedUsers.findIndex(item => item === user.id) > -1) {
      state.connectedUsers.push(user.id);
    }
  },
  [ChatEnums.SOCKET_USER_DISCONNECTED](state: UsersState, userDisconnected: UserDisconnected) {
    Vue.delete(state.connectedUsers, userDisconnected.idUser!);
  }
};
