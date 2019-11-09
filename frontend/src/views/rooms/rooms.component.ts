import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {Room} from '@/classes/room';
import {roomsService} from '@/services/room.service';
import {AxiosResponse} from 'axios';

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
    roomsService.getRooms().then((axiosResponse: AxiosResponse<Room[]>) => {
      if (axiosResponse.status == 200) {
        this.rooms = axiosResponse.data;
      } else {
        this.rooms = [];
      }
    });
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
    roomsService.deleteRoom(this.selectedRoom).then((response: AxiosResponse<Room>) => {
      if (response.status == 200) {
        const roomResponse: Room = response.data;
        const index: number = this.rooms.findIndex((tmpRoom: Room) => {
          return tmpRoom.id === roomResponse.id;
        });
        if (index > -1) {
          this.rooms.splice(index, 1);
        }
      }
      this.hideDeleteRoomModal();
    });
  }

  private createRoom(): void {
    roomsService.createRoom(this.selectedRoom).then((response: AxiosResponse<Room>) => {
      if (response.status == 201) {
        const roomResponse: Room = response.data;
        this.rooms.push(roomResponse);
      }
      this.hideRoomModal();
    });
  }

  private editRoom(): void {
    roomsService.updateRoom(this.selectedRoom).then((response: AxiosResponse<Room>) => {
      if (response.status == 200) {
        const roomResponse: Room = response.data;
        const index: number = this.rooms.findIndex((tmpRoom: Room) => {
          return tmpRoom.id === roomResponse.id;
        });
        if (index > -1) {
          Vue.set(this.rooms, index, roomResponse);
        }
      }
      this.hideRoomModal();
    });
  }

}
