import {Component, Ref, Vue} from 'vue-property-decorator';
import {RoomMessage} from '@/classes/room-message';

@Component({})
export default class RoomComponent extends Vue {

  @Ref('messageRoomList') readonly messageRoomList!: HTMLDivElement;
  @Ref('inputText') readonly inputText!: HTMLInputElement;
  public newRoomMessage: RoomMessage = new RoomMessage();
  private typingTimeout: number = -1;

  created() {


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

  }

  private scrollBottomMessageList(): void {
    this.$nextTick(() => {
      this.messageRoomList.scrollTop = this.messageRoomList.scrollHeight;
    });
  }


}
