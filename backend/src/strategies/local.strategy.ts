import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.validate(username, password);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        return user;
    }
}
