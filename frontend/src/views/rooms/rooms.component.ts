import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {Room} from '@/classes/room';
import {Getter, namespace} from 'vuex-class';

const roomsModule = namespace('roomsModule');

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class RoomsComponent extends Vue {

  @roomsModule.State('rooms') public rooms!: Room[];
  public selectedRoom: Room = new Room();
  public operationRoom: string = '';
  @Getter('userIsAdmin') public userIsAdmin!: () => boolean;
  @roomsModule.Getter('getUsersInRoom') public getUsersInRoom!: (idRoom: number) => number[];
  @roomsModule.Action('createRoom') private createRoomStore!: (room: Room) => Promise<Room>;
  @roomsModule.Action('updateRoom') private updateRoomStore!: (room: Room) => Promise<Room>;
  @roomsModule.Action('deleteRoom') private deleteRoomStore!: (room: Room) => Promise<Room>;

  public accessTheRoom(room: Room): void {
    this.$router.push(`/room/${room.id}`);
  }

  public showRoomModal(room?: Room): void {
    if (room != null) {
      this.operationRoom = 'edit';
      this.selectedRoom = Object.assign({}, room);
    } else {
      this.operationRoom = 'create';
      this.selectedRoom = new Room();
    }
    (this.$refs['modalRoom'] as any).show();
  }

  public hideRoomModal(): void {
    (this.$refs['modalRoom'] as any).hide();
  }

  public runOperationRoom(): void {
    if (this.operationRoom === 'create') {
      this.createRoom();
    } else {
      this.editRoom();
    }
  }

  public showDeleteRoomModal(room: Room): void {
    this.selectedRoom = Object.assign({}, room);
    (this.$refs['deleteModalRoom'] as any).show();
  }

  public hideDeleteRoomModal(): void {
    (this.$refs['deleteModalRoom'] as any).hide();
  }

  public deleteRoom(): void {
    this.deleteRoomStore(this.selectedRoom).then((room: Room) => {
      this.hideDeleteRoomModal();
    });
  }

  private createRoom(): void {
    this.createRoomStore(this.selectedRoom).then((room: Room) => {
      this.hideRoomModal();
    });
  }

  private editRoom(): void {
    this.updateRoomStore(this.selectedRoom).then((room: Room) => {
      this.hideRoomModal();
    });
  }

}
