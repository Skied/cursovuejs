import {Module} from '@nestjs/common';
import {UsersController} from './controllers/users.controller';
import {UsersService} from './services/users.service';
import {jwtConstants} from './constants';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {JwtStrategy} from './services/jwt.strategy';
import {RoomsController} from './controllers/rooms.controller';
import {RoomsService} from './services/rooms.service';
import {UserMessagesService} from './services/user-messages.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as path from 'path';
import {User} from './entities/user';
import {Room} from './entities/room';
import {UserMessage} from './entities/user-message';
import {RoomMessagesService} from './services/room-messages.service';
import {RoomMessage} from './entities/room-message';
import {EventsGateway} from './services/events.gateway';
import {UserMessagesController} from './controllers/user-messages.controller';
import {RoomMessagesController} from './controllers/room-messages.controller';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '24h'},
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chat',
      entities: [path.join(__dirname + '/entities/**/*.js')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Room,
      User,
      UserMessage,
      RoomMessage,
    ]),
  ],
  controllers: [
    AuthController,
    RoomsController,
    RoomMessagesController,
    UsersController,
    UserMessagesController,
  ],
  providers: [
    AuthService,
    EventsGateway,
    JwtStrategy,
    RoomsService,
    RoomMessagesService,
    UserMessagesService,
    UsersService,
  ],
})
export class AppModule {
}
