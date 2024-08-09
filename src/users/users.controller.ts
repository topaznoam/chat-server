import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
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
  async create(@Body() user: User): Promise<User | null> {
    const myuser = await this.usersService.SignUp(user);
    if (myuser === null) {
      throw new Error('User already exists');
    }
    return myuser;
  }

  @Post('login')
  async login(
    @Body() user: { username: string; password: string },
  ): Promise<User | null> {
    const myuser = await this.usersService.logIn(user.username, user.password);
    if (myuser === null) {
      throw new Error('Invalid credentials');
    }
    return myuser;
  }

  @Put(':id/img')
  async updateImg(
    @Param('id') id: number,
    @Body() body: { imageSrc: string },
  ): Promise<void> {
    await this.usersService.updateImg(id, body.imageSrc);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
