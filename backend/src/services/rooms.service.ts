import {Injectable, Logger} from '@nestjs/common';
import {Room} from '../entities/room';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class RoomsService {

  constructor(@InjectRepository(Room) private readonly repository: Repository<Room>) {
    this.populateRoomTable();
  }

  public createRoom(room: Room): Promise<Room> {
    return this.repository.save(room);
  }

  public getRooms(): Promise<Room[]> {
    return this.repository.find();
  }

  public async deleteRoom(idRoom: number): Promise<Room> {
    const roomDB: Room | undefined = await this.findById(idRoom);
    if (roomDB) {
      await this.repository.delete({
        id: idRoom,
      });
      return roomDB;
    } else {
      return null;
    }
  }

  public async updateRoom(room: Room): Promise<Room> {
    const roomDB: Room | undefined = await this.findById(room.id);
    if (roomDB) {
      return this.repository.save(room);
    } else {
      return null;
    }
  }

  private async populateRoomTable() {
    const rooms: Room[] = await this.repository.find();
    if (rooms.length > 0) {
      Logger.log(`There are ${rooms.length} rooms in DB`, RoomsService.name);
      return;
    }
    let room1: Room = new Room();
    room1.name = 'Coches';
    room1 = await this.createRoom(room1);
    Logger.log(`Inserted room '${room1.name}'`, RoomsService.name);
    let room2: Room = new Room();
    room2.name = 'Actualidad';
    room2 = await this.createRoom(room2);
    Logger.log(`Inserted room '${room2.name}'`, RoomsService.name);
    let room3: Room = new Room();
    room3.name = 'Tecnología';
    room3 = await this.createRoom(room3);
    Logger.log(`Inserted room '${room3.name}'`, RoomsService.name);
  }

  public findById(idRoom: number): Promise<Room | undefined> {
    return this.repository.findOne({
      where: {
        id: idRoom,
      },
    });
  }

}
