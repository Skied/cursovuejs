import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RoomMessage} from '../entities/room-message';
import {Injectable} from '@nestjs/common';

@Injectable()
export class RoomMessagesService {

  constructor(@InjectRepository(RoomMessage) private readonly repository: Repository<RoomMessage>) {
  }

  public creteRoomMessage(roomMessage: RoomMessage): Promise<RoomMessage> {
    return this.repository.save(roomMessage);
  }

  public async getRoomMessages(idRoom: number): Promise<RoomMessage[]> {
    const messages: RoomMessage[] = await this.repository.find({
      where: {
        idRoom,
      },
      order: {
        date: 'DESC',
      },
      take: 50,
    });
    return messages.reverse();
  }

}
