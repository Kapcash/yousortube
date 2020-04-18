import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionGroup, SubscriptionGroupDoc } from './subscriptionGroups.interface';

type Deletion = { ok?: number; n?: number; } & { deletedCount?: number };

@Injectable()
export class SubscriptionGroupService {

  constructor(@InjectModel('Subscription') private subscriptionGroupModel: Model<SubscriptionGroupDoc>) {}

  createSubscriptionGroup(title: string, channelIds: string[]) {
    const sub: SubscriptionGroup = {
      title,
      channels: channelIds,
    };
    const createdSubGrp = new this.subscriptionGroupModel(sub);
    return createdSubGrp.save();
  }

  deleteSubscriptionGroup(groupId: string): Promise<Deletion>{
    return this.subscriptionGroupModel.deleteOne({ _id: groupId }).exec();
  }

  editSubscriptionGroup(groupId: string, jsonpatchDto: any): Promise<any>{
    return null;
  }

  async findAll(): Promise<SubscriptionGroup[]> {
    return this.subscriptionGroupModel.find().exec();
  }

  async findOne(groupId: string): Promise<SubscriptionGroup> {
    return this.subscriptionGroupModel.findOne({ _id: groupId }).exec();
  }
}