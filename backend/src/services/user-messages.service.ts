import {Injectable} from '@nestjs/common';
import {UserMessage} from '../entities/user-message';
import {InjectRepository} from '@nestjs/typeorm';
import {Brackets, Repository} from 'typeorm';

@Injectable()
export class UserMessagesService {

  constructor(@InjectRepository(UserMessage) private readonly repository: Repository<UserMessage>) {
  }

  public createUserMessage(userMessage: UserMessage): Promise<UserMessage> {
    return this.repository.save(userMessage);
  }

  public async getPrivateMessages(idUser1: number, idUser2: number): Promise<UserMessage[]> {
    const userMessages: UserMessage[] = await this.repository.createQueryBuilder('userMessage')
      .where(new Brackets(qb => {
        qb.where('userMessage.idSender = :idUser1', {idUser1})
          .andWhere('userMessage.idReceiver = :idUser2', {idUser2});
      }))
      .orWhere(new Brackets(qb => {
        qb.where('userMessage.idReceiver = :idUser1', {idUser1})
          .andWhere('userMessage.idSender = :idUser2', {idUser2});
      }))
      .orderBy({
        date: 'DESC',
      })
      .limit(50)
      .getMany();
    return userMessages.reverse();
  }

  public async getNewMessages(idUser: number): Promise<UserMessage[]> {
    return this.repository.createQueryBuilder('userMessage')
      .where('userMessage.idReceiver = :idReceiver', {idReceiver: idUser})
      .andWhere('userMessage.markedAsRead = 0')
      .getMany();
  }

  public async updateUserMessageAsRead(idMessage: number): Promise<UserMessage> {
    await this.repository.query('UPDATE user_message set markedAsRead = 1 where id = ?', [idMessage]);
    return this.repository.findOne({
      where: {
        id: idMessage,
      },
    });
  }

}
