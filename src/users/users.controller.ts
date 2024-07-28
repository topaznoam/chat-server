import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Post('signup')
  async create(@Body() user: User): Promise<number | null> {
    console.log(user);
    const userId = await this.usersService.SignUp(user);
    if (userId === null) {
      throw new Error('User already exists');
    }
    return userId;
  }

  @Post('login')
  async login(
    @Body() user: { username: string; password: string },
  ): Promise<number | null> {
    console.log(user);
    const userId = await this.usersService.logIn(user.username, user.password);
    if (userId === null) {
      throw new Error('Invalid credentials');
    }
    return userId;
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
