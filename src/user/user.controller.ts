// user.controller.ts
import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users') // Le chemin du endpoint pour ce contrôleur
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
  }

}
