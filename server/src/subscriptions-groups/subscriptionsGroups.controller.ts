import { Controller, Get, Post, Delete, Patch, Param, Body, HttpStatus, HttpException, UseGuards, Req, applyDecorators } from '@nestjs/common';
import { SubscriptionGroup, CreateSubGroupDto, PatchOperation } from './subscriptionGroups.interface';
import { SubscriptionGroupsService } from './subscriptionGroups.service';
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard';
import { VideoDto } from 'src/dto/videos';

@Controller('subscription-groups')
@UseGuards(JwtAuthGuard)
export class SubscriptionGroupController {

  constructor(
    private readonly subscriptionGroupService: SubscriptionGroupsService,
  ) {}

  @Get()
  async getSubscriptionGroups(@Req() req): Promise<SubscriptionGroup[]> {
    return this.subscriptionGroupService.findAll(req.user._id);
  }

  @Get(':id')
  async getSubscriptionGroup(@Req() req, @Param('id') groupId: string): Promise<SubscriptionGroup> {
    return this.subscriptionGroupService.findOne(req.user._id, groupId);
  }

  /**
   * Create a new subscription group
   * @param groupTitle The group title
   * @param channelIds The channels ids to include in the group
   */
  @Post()
  createSubscriptionGroup(@Req() req, @Body() dto: CreateSubGroupDto): Promise<SubscriptionGroup> {
    return this.subscriptionGroupService.createSubscriptionGroup(req.user._id, dto.groupTitle, dto.channelIds);
  }

  /**
   * Remove a subscription group
   * @param groupId The subscription group id to remove
   */
  @Delete(':id')
  async removeSubscriptionGroup(@Req() req, @Param('id') groupId: string): Promise<void> {
    try {
      await this.subscriptionGroupService.deleteSubscriptionGroup(req.user._id, groupId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  editChannelInSubscriptionGroup(@Req() req, @Param('id') groupId: string, @Body() patchs: PatchOperation): Promise<SubscriptionGroup> {
    return this.subscriptionGroupService.editSubscriptionGroup(req.user.id, groupId, patchs);
  }

  @Get('/:id/videos')
  async getVideos(@Req() req, @Param('id') groupId: string): Promise<VideoDto[]> {
    return this.subscriptionGroupService.getGroupVideos(req.user._id, groupId);
  }
}
