import {Expose, Transform} from "class-transformer";
import {TASK_STATUS} from "../entities/task.entity";

export class CreateTaskResponseDto {
    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    dueDate: string;

    @Expose()
    status: TASK_STATUS;

    @Transform(({obj}) => {
        return obj._id
    })
    @Expose()
    id: string;

    @Transform(({obj}) => {
        if (!obj.assignee?.email) {
            return obj.assignee;
        }
        return {
            email: obj.assignee.email,
            id: obj.assignee._id,
            username: obj.assignee.username
        };
    })
    @Expose()
    assignee: string | UserResponseDto;

    @Transform(({obj}) => {
        if (!obj.tester?.email) {
            return obj.tester;
        }
        return {
            email: obj.tester.email,
            id: obj.tester._id,
            username: obj.tester.username
        };
    })
    @Expose()
    tester: string | UserResponseDto;

    @Transform(({obj}) => {
        if (!obj.reviewer?.email) {
            return obj.reviewer;
        }
        return {
            email: obj.reviewer.email,
            id: obj.reviewer._id,
            username: obj.reviewer.username
        };
    })
    @Expose()
    reviewer: string | UserResponseDto;

}

export class UserResponseDto {
    id: string;
    email: string;
}
