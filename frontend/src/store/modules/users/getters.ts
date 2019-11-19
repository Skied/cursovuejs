import {GetterTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';

export const getters: GetterTree<UsersState, RootState> = {
  getUsers: (state: UsersState): User[] => {
    return Object.values(state.users);
  },
  getUserById: (state: UsersState) => (idUser: number): User | null => {
    return state.users[idUser];
  },
  userIsConnected: (state: UsersState) => (idUser: number): boolean => {
    return state.connectedUsers.includes(idUser);
  }
};
