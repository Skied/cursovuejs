import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {RoomsState} from '@/store/modules/rooms/types';
import { getters } from '@/store/modules/rooms/getters';
import { mutations } from '@/store/modules/rooms/mutations';
import { actions } from '@/store/modules/rooms/actions';

const namespaced: boolean = true;

export const roomsModule: Module<RoomsState, RootState> = {
  namespaced,
  getters,
  mutations,
  actions
};
