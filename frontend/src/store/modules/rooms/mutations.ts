import {Vue} from 'vue-property-decorator';
import {MutationTree} from 'vuex';
import {RoomsState} from '@/store/modules/rooms/types';
import {Room} from '@/classes/room';

export const mutations: MutationTree<RoomsState> = {
  setRooms(state: RoomsState, room: Room[]) {
    state.rooms = {};
    room.forEach((room: Room) => {
      state.rooms[room.id!] = room;
    });
  },
  roomsError(state: RoomsState) {
    state.rooms = {};
  },
  newRoom(state: RoomsState, room: Room) {
    if (!state.rooms.hasOwnProperty(room.id!)) {
      Vue.set(state.rooms, room.id!, room);
    }
    if (!state.usersInRoom.hasOwnProperty(room.id!)) {
      Vue.set(state.usersInRoom, room.id!, []);
    }
  },
  updateRoom(state: RoomsState, room: Room) {
    // https://gist.github.com/DawidMyslak/2b046cca5959427e8fb5c1da45ef7748
    Vue.delete(state.rooms, room.id!);
    Vue.set(state.rooms, room.id!, room);
  },
  deleteRoom(state: RoomsState, room: Room) {
    if (state.rooms.hasOwnProperty(room.id!)) {
      Vue.delete(state.rooms, room.id!);
    }
    if (state.usersInRoom.hasOwnProperty(room.id!)) {
      Vue.delete(state.usersInRoom, room.id!);
    }
  },
};
