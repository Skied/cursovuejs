import {ApiModelProperty} from '@nestjs/swagger';
import {IsDefined, IsString} from 'class-validator';

export class AccessTokenDto {

  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public accessToken: string;

}
