import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Model, Types, Document} from "mongoose";
import {User} from "../../user/entities/user.entity";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    id: mongoose.Schema.Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    dueDate: string;

    @Prop({
        isRequired: true,
        default(): string {
            return TASK_STATUS.Backlog;
        }
    })
    status: TASK_STATUS;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        default: null
    })
    assignee: Types.ObjectId ;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        default: null
    })
    tester: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        default: null
    })
    reviewer: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export enum TASK_STATUS {
    Backlog = 'Backlog',
    Ready = 'Ready',
    Implementing = 'Implementing',
    Ready_Test = 'Ready for Test',
    Testing = 'Testing',
    Tested = "Tested",
    Ready_Review = 'Ready for Review',
    Reviewed = 'Reviewed',
    Done = 'Done'
}
