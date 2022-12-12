import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {Serialize} from "../interceptors/serialize.interceptor";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";
import {LocalAuthGuard} from "../guards/auth.guard";
import {RegisterUserDto, UpdateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UpdateUserPasswordDto} from "./dto/update-user-password.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: RegisterUserDto) {
    await this.userService.create(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Serialize(CreateUserResponseDto)
  getByRole(@Query() data: {role: string}) {
    return this.userService.getByRole(data.role);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(CreateUserResponseDto)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Serialize(CreateUserResponseDto)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @Post('changePassword')
  @UseGuards(JwtAuthGuard)
  updateUserPassword(@Request() req,
                     @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.userService.updateUserPassword(req.user, updateUserPasswordDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return {
      message: "User Deleted Successfully"
    }
  }
}
