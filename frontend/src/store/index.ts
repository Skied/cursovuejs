import Vue from 'vue';
import Vuex from 'vuex';
import {RootState} from '@/store/types';
import {usersModule} from '@/store/modules/users/store';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    user: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    usersModule,
  },
});
