import {GetterTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';

export const getters: GetterTree<UsersState, RootState> = {
  getUsers: (state: UsersState): User[] => {
    return [];
  },
  getUserById: (state: UsersState) => (idUser: number): User | null => {
    return null;
  },
  userIsConnected: (state: UsersState) => (idUser: number): boolean => {
    return false;
  },
};
