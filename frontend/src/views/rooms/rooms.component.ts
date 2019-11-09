import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {Room} from '@/classes/room';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class RoomsComponent extends Vue {

  public rooms: Room[] = [];
  public selectedRoom: Room = new Room();
  public operationRoom: string = '';

  created() {
    const room1: Room = new Room();
    room1.id = 1;
    room1.name = 'Actualidad';
    this.rooms.push(room1);
    const room2: Room = new Room();
    room2.id = 2;
    room2.name = 'Política';
    this.rooms.push(room2);
  }

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
    const index: number = this.rooms.findIndex((tmpRoom: Room) => {
      return tmpRoom.id === this.selectedRoom.id;
    });
    if (index > -1) {
      this.rooms.splice(index, 1);
    }
    this.hideDeleteRoomModal();
  }

  private createRoom(): void {
    this.rooms.push(this.selectedRoom);
    this.hideRoomModal();
  }

  private editRoom(): void {
    const index: number = this.rooms.findIndex((tmpRoom: Room) => {
      return tmpRoom.id === this.selectedRoom.id;
    });
    if (index > -1) {
      Vue.set(this.rooms, index, this.selectedRoom);
    }
    this.hideRoomModal();
  }

}
