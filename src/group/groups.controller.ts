import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './groups';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Group[]> {
    return this.groupsService.findMyGroups(id);
  }

  @Post()
  create(@Body() group: Group): Promise<Group> {
    return this.groupsService.create(group);
  }

  @Put(':id/img')
  async updateImg(
    @Param('id') id: number,
    @Body() body: { imageSrc: string },
  ): Promise<void> {
    await this.groupsService.updateImg(id, body.imageSrc);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.groupsService.remove(id);
  }
}
