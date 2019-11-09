import {GetterTree} from 'vuex';
import {RootState} from '@/store/types';
import {RoomsState} from '@/store/modules/rooms/types';
import {Room} from '@/classes/room';

export const getters: GetterTree<RoomsState, RootState> = {
  getRooms: (state: RoomsState) => {
    return Object.values(state.rooms);
  },
  getRoomById: (state: RoomsState) => (idRoom: number): Room | null => {
    if (state.rooms.hasOwnProperty(idRoom)) {
      return state.rooms[idRoom];
    } else {
      return null;
    }
  },
  getUsersInRoom: (state: RoomsState) => (idRoom: number): number[] => {
    if (state.usersInRoom.hasOwnProperty(idRoom)) {
      return state.usersInRoom[idRoom];
    } else {
      return [];
    }
  },
};
