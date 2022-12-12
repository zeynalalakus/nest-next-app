import {IsString, IsOptional, IsNotEmpty} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    dueDate: string;

    @IsString()
    @IsNotEmpty()
    assignee: string;

    @IsString()
    @IsNotEmpty()
    reviewer: string;

    @IsString()
    @IsNotEmpty()
    tester: string;
}
