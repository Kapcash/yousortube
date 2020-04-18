import { Controller, Get, HttpCode, Post, Delete, Patch, Param } from '@nestjs/common';
import { SubscriptionGroup, Video } from './subscriptionGroups.interface';
import { RssService } from 'src/rss/rss.service';
import { OpmlService } from 'src/rss/opml.service';

@Controller('subscription-groups')
export class SubscriptionGroupController {
  constructor(
    private readonly rssService: RssService,
    private readonly opmlService: OpmlService,
  ) {}

  @Get()
  @HttpCode(501)
  async getSubscriptionGroups(): Promise<SubscriptionGroup[]> {
    return [];
  }

  @Get(':id')
  @HttpCode(501)
  async getSubscriptionGroup(@Param('id') groupId: string): Promise<SubscriptionGroup[]> {
    return [];
  }

  /**
   * Create a new subscription group
   * @param groupTitle The group title
   * @param channelIds The channels ids to include in the group
   */
  @Post()
  @HttpCode(501)
  // TODO refacto into a DTO object
  async createSubscriptionGroup(groupTitle: string, channelIds?: string[]): Promise<SubscriptionGroup> {
    return null;
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
