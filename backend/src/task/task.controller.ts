import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {CreateTaskResponseDto} from "./dto/create-task-response.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    if (req.user.role === 'Developer' || req.user.role === 'Tester') {
      throw new ForbiddenException('Developers and Testers are not allowed to create tasks');
    }
    await this.taskService.create(createTaskDto);
  }

  @Get()
  @Serialize(CreateTaskResponseDto)
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @Serialize(CreateTaskResponseDto)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @Serialize(CreateTaskResponseDto)
  async update(@Request() req: any, @Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    if (req.user.role === 'Developer' || req.user.role === 'Tester') {
      throw new ForbiddenException('Developers and Testers are not allowed to update tasks');
    }
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    if (req.user.role === 'Developer' || req.user.role === 'Tester') {
      throw new ForbiddenException('Developers and Testers are not allowed to delete tasks');
    }
    await this.taskService.remove(id);
    return {
      message: 'Delete Successful'
    }
  }

  @Post(':id')
  async addPerson(@Request() req: any, @Param('id') taskId: string, @Body() body: any) {
    if (req.user.role === 'Developer' || req.user.role === 'Tester') {
      throw new ForbiddenException('Developers and Testers are not allowed to add person to tasks');
    }
    return await this.taskService.addPerson(body.role, taskId, body.userId);
  }

  @Post('status/:id')
  async changeTaskStatus(@Request() req: any, @Param('id') taskId: string, @Body() body: any) {
    if (req.user.role === 'Developer' || req.user.role === 'Tester') {
      throw new ForbiddenException('Developers and Testers are not allowed to change tasks status');
    }
    return await this.taskService.changeTaskStatus(body.status, taskId);
  }
}
