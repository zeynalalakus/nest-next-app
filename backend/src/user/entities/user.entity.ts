import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
    @Prop({
        isRequired: true
    })
    id: mongoose.Schema.Types.ObjectId

    @Prop({
        isRequired: true
    })
    email: string;

    @Prop({
        isRequired: true
    })
    username: string;

    @Prop({
        isRequired: true,
        default(): string {
            return 'Developer';
        }
    })
    role: 'Admin' | 'Manager' | 'Developer';

    @Prop({
        isRequired: true
    })
    password: string;

    @Prop({
        isRequired: true,
        default(): Date {
            return new Date();
        }
    })
    createdAt: Date;

    @Prop()
    deletedAt?: Date;

}



export const UserSchema = SchemaFactory.createForClass(User);
