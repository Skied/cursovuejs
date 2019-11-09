import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import {RoomMessage} from '@/classes/room-message';
import {roomMessagesService} from '@/services/room-messages.service';
import {AxiosResponse} from 'axios';
import jwt_decode from 'jwt-decode';
import {User} from '@/classes/user';
import {namespace} from 'vuex-class';
import {Room} from '@/classes/room';

const usersModule = namespace('usersModule');
const roomsModule = namespace('roomsModule');

@Component({})
export default class RoomComponent extends Vue {

  @Ref('messageRoomList') readonly messageRoomList!: HTMLDivElement;
  @Ref('inputText') readonly inputText!: HTMLInputElement;
  public newRoomMessage: RoomMessage = new RoomMessage();
  private typingTimeout: number = -1;
  public messages: RoomMessage[] = [];
  public currentUser!: User;
  @Prop(String) readonly idRoom!: string;
  @usersModule.Getter('getUserById') getUserById!: (idUser: number) => User;
  @roomsModule.Getter('getRoomById') getRoomById!: (idRoom: number) => Room;
  @roomsModule.Getter('getUsersInRoom') getUsersInRoom!: (idRoom: number) => number[];

  get room(): Room {
    const id: number = parseInt(this.idRoom, 10);
    return this.getRoomById(id);
  }

  get isSendMessageButtonDisabled(): boolean {
    return this.newRoomMessage.text == null || this.newRoomMessage.text === '';
  }

  get users(): string {
    const id: number = parseInt(this.idRoom, 10);
    const usernames: string[] = this.getUsersInRoom(id).filter((idUser: number) => {
      return idUser !== this.currentUser.id;
    }).map((idUser: number) => {
      return this.getUserById(idUser).name!;
    });
    if (usernames.length === 0) {
      return 'You';
    } else if (usernames.length === 1) {
      return usernames[0] + ', You';
    } else {
      return usernames.join(', ') + ', You';
    }
  }

  created() {
    this.currentUser = jwt_decode(localStorage.getItem('token')!);
    const id: number = parseInt(this.idRoom, 10);
    roomMessagesService.getRoomMessages(id).then((axiosResponse: AxiosResponse<RoomMessage[]>) => {
      if (axiosResponse.status === 200) {
        this.messages = axiosResponse.data;
        this.scrollBottomMessageList();
      }
    });
  }

  mounted() {
    this.inputText.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {


      } else if (this.newRoomMessage.text != null && this.newRoomMessage.text !== '') {


        if (this.typingTimeout !== -1) {
          clearTimeout(this.typingTimeout);
        }


        this.typingTimeout = setTimeout(() => {


        }, 500);
      } else {


      }
    };
  }

  public sendMessage(): void {
    this.newRoomMessage.idUser = this.currentUser.id;
    this.newRoomMessage.idRoom = parseInt(this.idRoom, 10);
    roomMessagesService.sendRoomMessage(this.newRoomMessage);
    this.newRoomMessage.text = null;
  }

  public isIncomingMessage(message: RoomMessage): boolean {
    return this.currentUser.id !== message.idUser;
  }

  public sendUserMessage(idUser: number): void {
    this.$router.push(`/chat/${idUser}`);
  }

  private scrollBottomMessageList(): void {
    this.$nextTick(() => {
      this.messageRoomList.scrollTop = this.messageRoomList.scrollHeight;
    });
  }


}
