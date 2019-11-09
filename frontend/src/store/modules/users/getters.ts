import {GetterTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';

export const getters: GetterTree<UsersState, RootState> = {
  getUsers: (state: UsersState): User[] => {
    return Object.values(state.users);
  },
  getUserById: (state: UsersState) => (idUser: number): User | null => {
    if (state.users.hasOwnProperty(idUser)) {
      return state.users[idUser];
    } else {
      return null;
    }
  },
  userIsConnected: (state: UsersState) => (idUser: number): boolean => {
    return state.connectedUsers.indexOf(idUser) > -1;
  },
};
