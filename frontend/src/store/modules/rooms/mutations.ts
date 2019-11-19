import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import { RoomsState } from '@/store/modules/rooms/types';
import { Room } from '@/classes/room';

export const mutations: MutationTree<RoomsState> = {
  setRooms: (state: RoomsState, rooms: Room[]) => {
    const newState: any = {};
    rooms.forEach( item => {
      if (item.id) {
        newState[item.id] = item;
      }
    });
    state.rooms = newState;
  },
  roomsError(state: RoomsState) {
    state.rooms = {};
  },
  newRoom(state: RoomsState, room: Room) {
    if (room.id) {
      state.rooms[room.id] = room;
      state.usersInRoom[room.id] = [];
    }
  },
  updateRoom(state: RoomsState, room: Room) {
    if (room.id) {
      state.rooms[room.id] = room;
    }
  },
  deleteRoom(state: RoomsState, room: Room) {
    if (room.id) {
      delete state.rooms[room.id];
    }
  }
};
