import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubscriptionGroup, SubscriptionGroupDoc, VideoDto, PatchOperation } from './subscriptionGroups.interface';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { Subscription } from 'src/subscriptions/subscription.interface';
import { YoutubeApiService } from 'src/youtube-api/youtubeApi.service';

type Deletion = { ok?: number; n?: number; } & { deletedCount?: number };

@Injectable()
export class SubscriptionGroupsService {

  constructor(
    @InjectModel('SubscriptionGroup') private subscriptionGroupModel: Model<SubscriptionGroupDoc>,
    private readonly subscriptionService: SubscriptionService,
    private readonly youtubeApiService: YoutubeApiService,
  ) {}

  findAll(userId: string): Promise<SubscriptionGroupDoc[]> {
    return this.subscriptionGroupModel.find({ userId }).populate('channels').exec();
  }

  findOne(userId: string, groupId: string): Promise<SubscriptionGroupDoc> {
    return this.subscriptionGroupModel.findOne({ userId, _id: groupId }).populate('channels').exec();
  }

  createSubscriptionGroup(userId: string, title: string, channelIds: string[]): Promise<SubscriptionGroupDoc> {
    const sub: SubscriptionGroup = {
      userId: Types.ObjectId(userId),
      title,
      channels: channelIds.map(id => Types.ObjectId(id))
    };
    const createdSubGrp = new this.subscriptionGroupModel(sub);
    return createdSubGrp.save();
  }

  async deleteSubscriptionGroup(userId: string, groupId: string): Promise<void> {
    const deletion: Deletion = await this.subscriptionGroupModel.deleteOne({ userId, _id: groupId }).exec();
    if (deletion.deletedCount !== 1) {
      throw new Error('Group id has not been deleted correctly');
    }
  }

  deleteAllSubscriptionGroup(userId: string): Promise<any> {
    return this.subscriptionGroupModel.deleteMany({ userId }).exec();
  }

  async editSubscriptionGroup(userId: string, groupId: string, patchs: PatchOperation): Promise<any> { 
    const getGroupQuery = { userId, _id: groupId };
    const channelsToAdd = patchs.add.map(id => Types.ObjectId(id));
    const channelsToRemove = patchs.remove.map(id => Types.ObjectId(id));
    if (channelsToAdd.length > 0) {
      this.subscriptionGroupModel.update(getGroupQuery, { $addToSet: { channels: { $each: channelsToAdd } } }).exec();
    }
    if (channelsToRemove.length > 0) {
      this.subscriptionGroupModel.update(getGroupQuery, { $pullAll: { channels:  channelsToRemove } }).exec();
    }
  }

  async getGroupVideos(userId: string, groupId: string): Promise<VideoDto[]> {
    const subGroup = await this.findOne(userId, groupId);
    const rssVideos = await this.subscriptionService.getSubsVideos(subGroup.channels as Subscription[])
    const videoInfos = await this.youtubeApiService.getVideosInfo(rssVideos.map(video => video.id));
    return videoInfos.map(vid => this.youtubeApiService.fromFullVideoToDto(vid));
  }
}