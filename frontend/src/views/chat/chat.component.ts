import {Component, Ref, Vue,Prop} from 'vue-property-decorator';
import {UserMessage} from '@/classes/user-message';
import { userMessagesService } from '../../services/user-messages.service';
import jwtDecode from 'jwt-decode';
import { User } from '@/classes/user';

@Component
export default class ChatComponent extends Vue {
  
  @Prop(String) idUser!: string;

  @Ref('messageList') readonly messageList!: HTMLDivElement;
  @Ref('inputText') readonly inputText!: HTMLInputElement;
  public newUserMessage: UserMessage = new UserMessage();
  public userIsTyping: boolean = false;
  private typingTimeout: number = -1;
  public messagesList: UserMessage[] = []; 
  private currentUser: User = new User();

  created() {
    const token = localStorage.getItem('token');
    this.currentUser = jwtDecode(token);
    userMessagesService.getUserMessages(Number(this.currentUser.id)).then(
      (res: any) => {
        // this.messagesList = res
        const mockMessages: UserMessage[] = [
          {id: 1, text: 'Hola k ase', idSender: 2, idReceiver: 1, date: new Date(), markedAsRead: false},
          {id: 3, text: 'Soy 3', idSender: 3, idReceiver: 1, date: new Date(), markedAsRead: false},
          {id: 2, text: 'Adie', idSender: 1, idReceiver: 2, date: new Date(), markedAsRead: true}
        ];
        this.messagesList = mockMessages;
      }
    );
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
    userMessagesService.sendUserMessage(this.newUserMessage);
  }


  private scrollBottomMessageList(): void {
    // this.$nextTick(() => {
    //   if (this.messageList != null) {
    //     this.messageList.scrollTop = this.messageList.scrollHeight;
    //   }
    // });
  }

}
