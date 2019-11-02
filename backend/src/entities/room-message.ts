import {ApiModelProperty} from '@nestjs/swagger';
import {User} from './user';
import {Room} from './room';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class RoomMessage {

  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'number'})
  public id: number;

  @Column('text')
  @ApiModelProperty({type: 'string'})
  public text: string;

  @Column('int')
  @ApiModelProperty({type: 'number'})
  public idRoom: number;

  @ManyToOne(type => Room, room => room.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'idRoom'})
  public room: Room;

  @Column('int')
  @ApiModelProperty({type: 'number'})
  public idUser: number;

  @ManyToOne(type => User, user => user.roomMessages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'idUser'})
  public user: User;

  @CreateDateColumn()
  @ApiModelProperty({type: Date})
  public date: Date;

  constructor() {
    this.id = -1;
    this.text = null;
    this.idRoom = -1;
    this.room = null;
    this.idUser = -1;
    this.user = null;
    this.date = null;
  }

}
