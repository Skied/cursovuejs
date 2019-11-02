import {ApiModelProperty} from '@nestjs/swagger';
import {IsDefined, IsString} from 'class-validator';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RoomMessage} from './room-message';

@Entity()
export class Room {

  @PrimaryGeneratedColumn()
  @ApiModelProperty({type: 'number'})
  public id: number | null;

  @Column({length: 500})
  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public name: string;

  @OneToMany(type => RoomMessage, roomMessage => roomMessage.room)
  public messages: RoomMessage[];

  constructor() {
    this.id = null;
    this.name = null;
  }

}
