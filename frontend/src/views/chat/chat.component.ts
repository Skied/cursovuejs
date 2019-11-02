import {Component, Ref, Vue} from 'vue-property-decorator';
import {UserMessage} from '@/classes/user-message';

@Component
export default class ChatComponent extends Vue {

  @Ref('messageList') readonly messageList!: HTMLDivElement;
  @Ref('inputText') readonly inputText!: HTMLInputElement;
  public newUserMessage: UserMessage = new UserMessage();
  public userIsTyping: boolean = false;
  private typingTimeout: number = -1;


  created() {


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

  }


  private scrollBottomMessageList(): void {
    this.$nextTick(() => {
      if (this.messageList != null) {
        this.messageList.scrollTop = this.messageList.scrollHeight;
      }
    });
  }

}
