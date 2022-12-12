import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {RegisterUserDto, UpdateUserDto} from "./dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import {UpdateUserPasswordDto} from "./dto/update-user-password.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                private jwtService: JwtService) {
    }

    async create(createUserDto: RegisterUserDto) {
        const user = await this.userModel.findOne({email: createUserDto.email})
        if (user) {
            throw new BadRequestException('User Already Exists')
        }
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
        const hashedPassword = `${salt}.${hash.toString('hex')}`;
        await new this.userModel({
            ...createUserDto,
            password: hashedPassword
        }).save();
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findOne(id: string) {
        return this.findByIdOrThrowError(id);
    }

    async findOneByEmail(email: string) {
        return this.userModel.findOne({email: email});
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findByIdOrThrowError(id);
        user.email = updateUserDto.email;
        user.role = updateUserDto.role as any;
        user.username = updateUserDto.username;
        return await user.save();
    }

    async remove(id: string) {
        const user = await this.findByIdOrThrowError(id);
        return await user.remove();
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user._id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email,
            id: user._id,
            username: user.username,
            role: user.role
        };
    }

    async validate(email: string, password: string) {
        const user = await this.userModel.findOne({email: email})
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong Password');
        }
        return user;
    }

    async findByIdOrThrowError(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User Not Found')
        } else {
            return user;
        }
    }

    getByRole(role: string) {
        return this.userModel.find({role: role});
    }

    async updateUserPassword(userData: any, updateUserPasswordDto: UpdateUserPasswordDto) {
        const user = await this.validate(userData.email, updateUserPasswordDto.oldPassword);
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(updateUserPasswordDto.newPassword, salt, 32)) as Buffer;
        user.password = `${salt}.${hash.toString('hex')}`;
        await user.save();
    }
}
