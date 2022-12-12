import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {Connection} from "mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "../strategies/jwt.strategy";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    })],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy]
})
export class UserModule {}
