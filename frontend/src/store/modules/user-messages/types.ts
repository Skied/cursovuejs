import {UserMessage} from '@/classes/user-message';

export interface UserMessagesState {
  // Diccionario cuyas claves son ids de usuario que han enviado mensajes al usuario conectado y valor el listado de usuarios
  newMessages: {[idSender: number]: UserMessage[]};
  // Listado de mensajes entre 2 usuarios
  messages: UserMessage[];
}
