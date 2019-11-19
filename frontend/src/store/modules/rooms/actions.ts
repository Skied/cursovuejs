import {ActionTree} from 'vuex';
import {RootState} from '@/store/types';
import { RoomsState } from '@/store/modules/rooms/types';
import { roomsService } from '@/services/room.service';
import { Room } from '@/classes/room';

export const actions: ActionTree<RoomsState, RootState> = {
  getRooms: (context: any) => {
    roomsService.getRooms().then((rooms: Room[]) => {
      context.commit('setRooms', rooms);
    });
  },
  createRoom: (context: any, room: Room) => {
    roomsService.createRoom(room).then(() => {
      context.commit('newRoom', room);
    });
  },
  updateRoom: (context: any, room: Room) => {
    roomsService.updateRoom(room).then(() => {
      context.commit('updateRoom', room);
    });
  },
  deleteRoom: (context: any, room: Room) => {
    roomsService.deleteRoom(room).then(() => {
      context.commit('deleteRoom', room);
    });
  }
};
