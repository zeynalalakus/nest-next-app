import {IsString, MaxLength, MinLength} from "class-validator";

export class UpdateUserPasswordDto {

    @IsString()
    oldPassword: string;

    @IsString()
    @MinLength(6, {message: 'Password must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Password must be min 6 and max 100 characters'})
    newPassword: string;
}
