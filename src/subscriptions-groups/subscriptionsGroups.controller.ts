import { Controller, Get, HttpCode, Post, Delete, Patch, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { SubscriptionGroup, CreateSubGroupDto, VideoDto } from './subscriptionGroups.interface';
import { SubscriptionGroupsService } from './subscriptionGroups.service';

@Controller('subscription-groups')
export class SubscriptionGroupController {

  constructor(
    private readonly subscriptionGroupService: SubscriptionGroupsService,
  ) {
    
  }

  @Get()
  async getSubscriptionGroups(): Promise<SubscriptionGroup[]> {
    return this.subscriptionGroupService.findAll();
  }

  @Get(':id')
  async getSubscriptionGroup(@Param('id') groupId: string): Promise<SubscriptionGroup> {
    return this.subscriptionGroupService.findOne(groupId);
  }

  /**
   * Create a new subscription group
   * @param groupTitle The group title
   * @param channelIds The channels ids to include in the group
   */
  @Post()
  createSubscriptionGroup(@Body() dto: CreateSubGroupDto): Promise<SubscriptionGroup> {
    const userId = '1';
    return this.subscriptionGroupService.createSubscriptionGroup(userId, dto.groupTitle, dto.channelIds);
  }

  /**
   * Remove a subscription group
   * @param groupId The subscription group id to remove
   */
  @Delete(':id')
  async removeSubscriptionGroup(@Param('id') groupId: string): Promise<void> {
    try {
      await this.subscriptionGroupService.deleteSubscriptionGroup(groupId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @HttpCode(501)
  async addChannelToSubscriptionGroup(@Param('id') groupId: string, channelIds: string[]): Promise<SubscriptionGroup> {
    // Use JSON Patch (http://jsonpatch.com/) format
    return null;
  }

  @Get('/:id/videos')
  @HttpCode(501)
  async getVideos(@Param('id') groupId: string): Promise<VideoDto[]> {
    return this.subscriptionGroupService.getGroupVideos(groupId);
  }
}
