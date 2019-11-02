import {ApiModelProperty} from '@nestjs/swagger';
import {IsDefined, IsString} from 'class-validator';
import {Exclude} from 'class-transformer';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserMessage} from './user-message';
import {RoomMessage} from './room-message';
import {RoleEnum} from '../enums/role.enum';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'number'})
  public id: number | null;

  @Column({length: 500})
  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public name: string | null;

  @Column({length: 500})
  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public email: string | null;

  @Column({length: 500})
  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public username: string | null;

  @ApiModelProperty({
    type: 'number',
    required: true,
    enum: [RoleEnum.Admin, RoleEnum.User],
    default: RoleEnum.User,
  })
  @Column({
    type: 'int',
    nullable: false,
    default: RoleEnum.User,
  })
  role: RoleEnum;

  @Column({length: 500})
  @Exclude()
  public password: string | null;

  @OneToMany(type => UserMessage, userMessage => userMessage.sender)
  public privateMessagesSent: UserMessage[];

  @OneToMany(type => UserMessage, userMessage => userMessage.receiver)
  public privateMessagesReceived: UserMessage[];

  @OneToMany(type => RoomMessage, roomMessage => roomMessage.idUser)
  public roomMessages: RoomMessage[];

  constructor() {
    this.id = null;
    this.name = null;
    this.email = null;
    this.username = null;
    this.password = null;
    this.role = RoleEnum.User;
  }

}
