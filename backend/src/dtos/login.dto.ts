import {ApiModelProperty} from '@nestjs/swagger';
import {IsDefined, IsString} from 'class-validator';

export class LoginDto {

  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public username: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty({type: 'string'})
  public password: string;

}
