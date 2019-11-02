import {Room} from '@/classes/room';

export interface RoomsState {
  rooms: {[idRoom: number]: Room};
  usersInRoom: {[idRoom: number]: number[]};
}
