import {RoleEnum} from '../enums/role.enum';

export interface UserPayloadInterface {
  id: number;
  username: string;
  name: string;
  role: RoleEnum;
  iat?: number;
  exp?: number;
}
