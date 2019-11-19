import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {User} from '@/classes/user';
import {ChatEnums} from '@/enums/chat.enums';
import {UserDisconnected} from '@/interfaces/socket-data.interface';

export const mutations: MutationTree<UsersState> = {
  usersLoaded(state: UsersState, users: User[]) {
    const userState: any = {};
    users.forEach( item => userState[item.id] = item);
    state.users = userState;
  },
  usersError(state: UsersState) {
    state.users = {};
  },
  updateUser(state: UsersState, user: User) {
    state.users[user.id] = user;
  },
  deleteUser(state: UsersState, user: User) {
    delete state.users[user.id];
  },
  [ChatEnums.SOCKET_USER_CONNECTED](state: UsersState, user: User) {
  },
  [ChatEnums.SOCKET_USER_DISCONNECTED](state: UsersState, userDisconnected: UserDisconnected) {
  }
};
