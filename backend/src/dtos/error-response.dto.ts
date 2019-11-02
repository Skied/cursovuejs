import {HttpStatus} from '@nestjs/common';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsDefined, IsEnum, IsString} from 'class-validator';

export class ErrorResponseDto {

  @ApiModelProperty({
    type: 'number',
  })
  @IsEnum(HttpStatus)
  @IsDefined()
  public statusCode: HttpStatus;

  @ApiModelProperty({type: 'string'})
  @IsString()
  @IsDefined()
  public message: string;

}
