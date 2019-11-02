import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {RoomsState} from '@/store/modules/rooms/types';

const namespaced: boolean = true;

export const roomsModule: Module<RoomsState, RootState> = {
  namespaced,
};
