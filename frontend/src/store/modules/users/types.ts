import {User} from '@/classes/user';

export interface UsersState {
  // Usuarios de la aplicación, la clave es el id del usuario y el valor el usuario
  users: { [idUser: number]: User };
  // Listado de identificadores de usuarios conectados
  connectedUsers: number[];
}
