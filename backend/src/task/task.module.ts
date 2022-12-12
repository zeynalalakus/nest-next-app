import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TaskSchema} from "./entities/task.entity";
import {UserService} from "../user/user.service";
import {User, UserSchema} from "../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}, {name: User.name, schema: UserSchema}])],
  controllers: [TaskController],
  providers: [TaskService, UserService, JwtService]
})
export class TaskModule {}
