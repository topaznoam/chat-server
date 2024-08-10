import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './groups';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

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
}
