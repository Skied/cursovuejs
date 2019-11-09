import {ActionTree} from 'vuex';
import {RootState} from '@/store/types';
import {AxiosError, AxiosResponse} from 'axios';
import {Room} from '@/classes/room';
import {roomsService} from '@/services/room.service';

export const actions: ActionTree<any, RootState> = {
  getRooms({commit}): void {
    roomsService.getRooms().then((response: AxiosResponse<Room[]>) => {
      if (response.status == 200) {
        commit('setRooms', response.data);
      }
    }).catch((error: AxiosError) => {
      commit('roomsError');
    });
  },
  createRoom({commit}, room: Room): Promise<Room | null> {
    return new Promise<Room | null>((resolve) => {
      roomsService.createRoom(room).then((response: AxiosResponse<Room>) => {
        if (response.status == 201) {
          const roomResponse: Room = response.data;
          resolve(roomResponse);
          commit('newRoom', room);
        } else {
          resolve(null);
        }
      });
    });
  },
  updateRoom({commit}, room: Room): Promise<Room | null> {
    return new Promise<Room | null>((resolve) => {
      roomsService.updateRoom(room).then((response: AxiosResponse<Room>) => {
        if (response.status == 200) {
          const roomResponse: Room = response.data;
          commit('updateRoom', roomResponse);
          resolve(roomResponse);
        } else {
          resolve(null);
        }
      });
    });
  },
  deleteRoom({commit}, room: Room): Promise<Room | null> {
    return new Promise<Room | null>((resolve) => {
      roomsService.deleteRoom(room).then((response: AxiosResponse<Room>) => {
        if (response.status == 200) {
          const roomResponse: Room = response.data;
          commit('deleteRoom', roomResponse);
          resolve(roomResponse);
        } else {
          resolve(null);
        }
      });
    });
  },
};
