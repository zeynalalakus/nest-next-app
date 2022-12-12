import {IsEmail, IsEnum, IsOptional, IsString, MaxLength, Min, MinLength} from "class-validator";
export enum USER_ROLES {
    ADMIN = 'Admin',
    MANAGER = 'Manager',
    DEVELOPER = 'Developer',
    TEST = 'Tester'
}
export class RegisterUserDto {
    @IsEmail({}, {message: 'Email field must be a valid email address'})
    @MinLength(6, {message: 'Email must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Email must be min 6 and max 100 characters'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'Password must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Password must be min 6 and max 100 characters'})
    password: string;

    @IsString()
    @MinLength(6, {message: 'Username must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Username must be min 6 and max 100 characters'})
    username: string;

    @IsEnum(USER_ROLES)
    @IsOptional()
    role: string;
}
export class UpdateUserDto {
    @IsEmail({}, {message: 'Email field must be a valid email address'})
    @MinLength(6, {message: 'Email must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Email must be min 6 and max 100 characters'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'Username must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Username must be min 6 and max 100 characters'})
    username: string;

    @IsEnum(USER_ROLES)
    @IsOptional()
    role: string;
}

export class LoginUserDto {
    @IsEmail({}, {message: 'Email field must be a valid email address'})
    @MinLength(6, {message: 'Email must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Email must be min 6 and max 100 characters'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'Password must be min 6 and max 100 characters'})
    @MaxLength(100, {message: 'Password must be min 6 and max 100 characters'})
    password: string;
}

