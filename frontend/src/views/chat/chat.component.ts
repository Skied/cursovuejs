import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import {UserMessage} from '@/classes/user-message';
import {userMessagesService} from '@/services/user-messages.service';
import {User} from '@/classes/user';
import jwt_decode from 'jwt-decode';
import {namespace, State} from 'vuex-class';

const usersModule = namespace('usersModule');
const userMessagesModule = namespace('userMessagesModule');

@Component
export default class ChatComponent extends Vue {

  @Ref('messageList') readonly messageList!: HTMLDivElement;
  @Ref('inputText') readonly inputText!: HTMLInputElement;
  public newUserMessage: UserMessage = new UserMessage();
  public userIsTyping: boolean = false;
  private typingTimeout: number = -1;
  @userMessagesModule.State('messages') private messages!: UserMessage[];
  @Prop(String) readonly idFriend!: string;
  @State('user') currentUser!: User;
  @userMessagesModule.Action('getMessages') private getMessages!: (idFriend: number) => void;
  @usersModule.Getter('getUserById') getUserById!: (idUser: number) => User;

  get friend(): User {
    const id: number = parseInt(this.idFriend, 10);
    return this.getUserById(id);
  }

  get isSendMessageButtonDisabled(): boolean {
    return this.newUserMessage.text == null || this.newUserMessage.text === '';
  }

  created() {
    this.currentUser = jwt_decode(localStorage.getItem('token')!);
    const id: number = parseInt(this.idFriend, 10);
    this.getMessages(id);
  }

  mounted() {
    // El usuario está escribiendo...
    this.inputText.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        // Usuario pulsa 'enter'

      } else if (this.newUserMessage.text != null && this.newUserMessage.text !== '') {
        // El texto del mensaje es válido

        if (this.typingTimeout !== -1) {
          clearTimeout(this.typingTimeout);
        }
        this.typingTimeout = setTimeout(() => {
          // El usuario ya no está escribiendo

        }, 500);
      } else {
        // El usuario ya no está escribiendo


      }
    };


  }

  public sendMessage(): void {
    this.newUserMessage.idSender = this.currentUser.id;
    this.newUserMessage.idReceiver = parseInt(this.idFriend, 10);
    userMessagesService.sendUserMessage(this.newUserMessage);
    this.newUserMessage.text = null;
  }

  private scrollBottomMessageList(): void {
    this.$nextTick(() => {
      if (this.messageList != null) {
        this.messageList.scrollTop = this.messageList.scrollHeight;
      }
    });
  }

  public isIncomingMessage(message: UserMessage): boolean {
    return this.currentUser.id !== message.idSender;
  }

}
