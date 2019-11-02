import {ActionTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';

export const actions: ActionTree<UsersState, RootState> = {
  setUsers({commit}): Promise<User[]> {
    return Promise.resolve([]);
  },
  updateUser({commit}, user: User): Promise<User | null> {
    return Promise.resolve(null);
  },
  deleteUser({commit}, user: User): Promise<User | null> {
    return Promise.resolve(null);
  },
};
