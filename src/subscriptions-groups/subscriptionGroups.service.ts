import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubscriptionGroup, SubscriptionGroupDoc, VideoDto } from './subscriptionGroups.interface';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { Subscription } from 'src/subscriptions/subscription.interface';
import { YoutubeApiService } from 'src/youtube-api/youtubeApi.service';

type Deletion = { ok?: number; n?: number; } & { deletedCount?: number };

@Injectable()
export class SubscriptionGroupService {

  constructor(
    @InjectModel('SubscriptionGroup') private subscriptionGroupModel: Model<SubscriptionGroupDoc>,
    private readonly subscriptionService: SubscriptionService,
    private readonly youtubeApiService: YoutubeApiService,
  ) {}

  findAll(): Promise<SubscriptionGroup[]> {
    return this.subscriptionGroupModel.find().exec();
  }

  findOne(groupId: string): Promise<SubscriptionGroup> {
    return this.subscriptionGroupModel.findOne({ _id: groupId }).populate('channels').exec();
  }

  createSubscriptionGroup(title: string, channelIds: string[]): Promise<SubscriptionGroup> {
    const sub: SubscriptionGroup = {
      title,
      channels: channelIds.map(id => Types.ObjectId(id))
    };
    const createdSubGrp = new this.subscriptionGroupModel(sub);
    return createdSubGrp.save();
  }

  async deleteSubscriptionGroup(groupId: string): Promise<void> {
    const deletion: Deletion = await this.subscriptionGroupModel.deleteOne({ _id: groupId }).exec();
    if (deletion.deletedCount !== 1) {
      throw new Error('Group id has not been deleted correctly');
    }
  }

  editSubscriptionGroup(groupId: string, jsonpatchDto: any): Promise<any> { 
    return null;
  }

  async getGroupVideos(groupId: string): Promise<VideoDto[]> {
    const subGroup = await this.findOne(groupId);
    const rssVideos = await this.subscriptionService.getSubsVideos(subGroup.channels as Subscription[])
    const videoInfos = await this.youtubeApiService.getVideosInfo(rssVideos.map(video => video.id));
    return videoInfos.map(vid => this.youtubeApiService.fromFullVideoToDto(vid));
  }
}