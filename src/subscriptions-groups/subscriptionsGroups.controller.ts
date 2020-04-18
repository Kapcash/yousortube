import { Controller, Get, HttpCode, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { SubscriptionGroup, Video, CreateSubGroupDto } from './subscriptionGroups.interface';
import { SubscriptionGroupService } from './subscriptionGroups.service';

@Controller('subscription-groups')
export class SubscriptionGroupController {

  constructor(
    private readonly subscriptionGroupService: SubscriptionGroupService,
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
  // TODO refacto into a DTO object
  createSubscriptionGroup(@Body() dto: CreateSubGroupDto): Promise<SubscriptionGroup> {
    return this.subscriptionGroupService.createSubscriptionGroup(dto.groupTitle, dto.channelIds);
  }

  /**
   * Remove a subscription group
   * @param groupId The subscription group id to remove
   */
  @Delete(':id')
  @HttpCode(501)
  async removeSubscriptionGroup(@Param('id') groupId: string): Promise<SubscriptionGroup> {
    return null;
  }

  @Patch(':id')
  @HttpCode(501)
  async addChannelToSubscriptionGroup(@Param('id') groupId: string, channelIds: string[]): Promise<SubscriptionGroup> {
    // Use JSON Patch (http://jsonpatch.com/) format
    return null;
  }

  @Get('/:id/videos')
  @HttpCode(501)
  async getVideos(@Param('id') groupId: string): Promise<Video[]> {
    return [];
  }
}
