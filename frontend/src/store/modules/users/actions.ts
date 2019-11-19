import {ActionTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';
import { usersService } from '../../../services/users.service';

export const actions: ActionTree<UsersState, RootState> = {
  getUsers: (context: any) => {
    usersService.getUsers().then((users: User[]) => {
      context.commit('usersLoaded', users)
    });
  },
  updateUser: (context: any, user: User) => {
    usersService.updateUser(user).then((newUser: User) => {
      context.commit('updateUser', newUser);
    });
  },
  deleteUser: (context: any, user: User) => {
    usersService.deleteUser(user).then((deleteUser: User) => {
      context.commit('deleteUser', deleteUser);
    });
  },
};
