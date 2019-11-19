import {GetterTree} from 'vuex';
import {RootState} from '@/store/types';
import { RoomsState } from '@/store/modules/rooms/types';
import { Room } from '@/classes/room';

export const getters: GetterTree<RoomsState, RootState> = {
  getRooms: (state: RoomsState): Room[] => {
    return Object.values(state.rooms);
  },
  getRoomById: (state: RoomsState) => (idRoom: number): Room | null => {
    return idRoom ? state.rooms[idRoom] : null;
  },
  getUsersInRoom: (state: RoomsState) => (idRoom: number): number[] => {
    return idRoom ? state.usersInRoom[idRoom] : [];
  }
};
