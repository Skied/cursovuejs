import {User} from './user';
import {ApiModelProperty} from '@nestjs/swagger';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class UserMessage {

  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'number'})
  public id: number;

  @Column('text')
  @ApiModelProperty({type: 'string'})
  public text: string;

  @Column('int')
  @ApiModelProperty({type: 'number'})
  public idSender: number;

  @Exclude()
  @ManyToOne(type => User, user => user.privateMessagesSent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'idSender'})
  public sender: User;

  @Column('int')
  @ApiModelProperty({type: 'number'})
  public idReceiver: number;

  @Exclude()
  @ManyToOne(type => User, user => user.privateMessagesReceived, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'idReceiver'})
  public receiver: User;

  @Column({
    default: false,
    name: 'markedAsRead',
    type: 'int',
  })
  @ApiModelProperty({type: 'boolean', default: false})
  public markedAsRead: boolean;

  @CreateDateColumn()
  @ApiModelProperty({type: Date})
  public date: Date;

  constructor() {
    this.id = null;
    this.text = null;
    this.idSender = -1;
    this.sender = null;
    this.idReceiver = -1;
    this.receiver = null;
    this.date = null;
    this.markedAsRead = false;
  }

}
