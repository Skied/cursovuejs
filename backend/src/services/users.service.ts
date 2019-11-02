import {Injectable, Logger} from '@nestjs/common';
import {User} from '../entities/user';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {jwtConstants} from '../constants';
import {RoleEnum} from '../enums/role.enum';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    this.populateUserTable();
  }

  public async createUser(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, jwtConstants.saltRounds);
    return this.repository.save(user);
  }

  public getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public async deleteUser(idUser: number): Promise<User> {
    const user: User | undefined = await this.findById(idUser);
    if (user) {
      await this.repository.delete({
        id: idUser,
      });
      return user;
    } else {
      return null;
    }
  }

  public async updateUser(user: User): Promise<User> {
    const userDB: User | undefined = await this.findById(user.id);
    if (userDB) {
      return this.repository.save(user);
    } else {
      return null;
    }
  }

  private async populateUserTable() {
    let adminUser: User = await this.findByUsername('admin');
    if (!adminUser) {
      adminUser = new User();
      adminUser.username = 'admin';
      adminUser.email = 'admin@gmail.com';
      adminUser.name = 'Admin';
      adminUser.password = 'password';
      adminUser.role = RoleEnum.Admin;
      await this.createUser(adminUser);
      Logger.log(`Inserted admin user`, UsersService.name);
    } else {
      Logger.log(`User admin already in DB`, UsersService.name);
    }
  }

  public findById(idUser: number): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        id: idUser,
      },
    });
  }

  public findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        username,
      },
    });
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

}
