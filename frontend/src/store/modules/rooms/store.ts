import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {RoomsState} from '@/store/modules/rooms/types';
import {state} from '@/store/modules/rooms/state';
import {getters} from '@/store/modules/rooms/getters';
import {actions} from '@/store/modules/rooms/actions';
import {mutations} from '@/store/modules/rooms/mutations';

const namespaced: boolean = true;

export const roomsModule: Module<RoomsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
