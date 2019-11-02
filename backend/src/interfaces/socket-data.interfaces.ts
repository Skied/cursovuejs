export interface RegisterData {
  idUser: number;
}

export interface UserRoomData {
  idRoom: number;
  idUser: number;
}

export interface UserTypingData {
  idSender: number;
  idReceiver: number;
  typing: boolean;
}

export interface UserInRoomTypingData {
  idUser: number;
  idRoom: number;
  typing: boolean;
}

export interface UserReadMessage {
  idMessage: number;
}

export interface UserDisconnected {
  idUser: number;
}
