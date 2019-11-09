import {ActionTree} from 'vuex';
import {UsersState} from '@/store/modules/users/types';
import {RootState} from '@/store/types';
import {User} from '@/classes/user';
import {usersService} from '@/services/users.service';
import {AxiosError, AxiosResponse} from 'axios';

export const actions: ActionTree<UsersState, RootState> = {
  getUsers({commit}): Promise<User[]> {
    return new Promise<User[]>((resolve) => {
      usersService.getUsers().then((response: AxiosResponse<User[]>) => {
        if (response.status == 200) {
          const users: User[] = response.data;
          commit('usersLoaded', users);
          resolve(users);
        } else {
          resolve([]);
        }
      }).catch((error: AxiosError) => {
        commit('usersError');
      });
    });
  },
  updateUser({commit}, user: User): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      usersService.updateUser(user).then((response: AxiosResponse<User>) => {
        if (response.status == 200) {
          const userResponse: User = response.data;
          commit('updateUser', userResponse);
          resolve(userResponse);
        } else {
          resolve(null);
        }
      });
    });
  },
  deleteUser({commit}, user: User): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      usersService.deleteUser(user).then((response: AxiosResponse<User>) => {
        if (response.status == 200) {
          const userResponse: User = response.data;
          commit('deleteUser', user);
          resolve(userResponse);
        } else {
          resolve(null);
        }
      });
    });
  },
};
