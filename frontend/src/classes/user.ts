import {RoleEnum} from '@/enums/role.enum';

export class User {
  public id!: number;
  public name!: string | null;
  public email!: string | null;
  public username!: string | null;
  public password!: string | null;
  public role!: RoleEnum;

  constructor() {
    this.role = RoleEnum.User;
  }

}
