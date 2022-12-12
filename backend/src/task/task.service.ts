import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Task, TASK_STATUS} from "./entities/task.entity";
import {Model} from "mongoose";
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,
        private readonly usersService: UserService
    ) {}

    async create(createTaskDto: CreateTaskDto) {
        const task = await new this.taskModel(createTaskDto);
        return await task.save();
    }

    async findAll() {
        return await this.taskModel.find()
            .populate('assignee', ['email', 'username'])
            .populate('tester', ['email', 'username'])
            .populate('reviewer', ['email', 'username']).exec();
    }

    async findOne(id: string) {
        return await this.findOrFail(id);
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.findOrFail(id);
        await task.update(updateTaskDto);
        return task;
    }

    async remove(id: string) {
        const task = await this.findOrFail(id);
        await task.delete();
    }

    async addPerson(role: any, taskId: string, userId) {
        const task = await this.findOrFail(taskId);
        const user = await this.usersService.findByIdOrThrowError(userId);
        task.set(role, user._id);
        return await task.save();
    }

    async findOrFail(id: string) {
        const task =
            await this.taskModel.findOne({_id: id})
            .populate('assignee', ['email', 'username'])
            .populate('tester', ['email', 'username'])
            .populate('reviewer', ['email', 'username']).exec();
        if (!task) {
            throw new NotFoundException('Task Not Found');
        } else {
            return task;
        }
    }

    async changeTaskStatus(status: TASK_STATUS, taskId: string) {
        const task = await this.findOrFail(taskId);
        task.set('status', status);
        return await task.save();
    }
}
