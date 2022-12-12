import {Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import {APP_PIPE} from "@nestjs/core";
import { TaskModule } from './task/task.module';

const mongoDbConnectionUrl = '';

@Module({
  imports: [MongooseModule.forRoot(mongoDbConnectionUrl),
    UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {}
