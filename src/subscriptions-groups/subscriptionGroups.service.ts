import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubscriptionGroup, SubscriptionGroupDoc } from './subscriptionGroups.interface';

type Deletion = { ok?: number; n?: number; } & { deletedCount?: number };

@Injectable()
export class SubscriptionGroupService {

  constructor(@InjectModel('SubscriptionGroup') private subscriptionGroupModel: Model<SubscriptionGroupDoc>) {}

  findAll(): Promise<SubscriptionGroup[]> {
    return this.subscriptionGroupModel.find().exec();
  }

  findOne(groupId: string): Promise<SubscriptionGroup> {
    return this.subscriptionGroupModel.findOne({ _id: groupId }).exec();
  }

  createSubscriptionGroup(title: string, channelIds: string[]): Promise<SubscriptionGroup> {
    const sub: SubscriptionGroup = {
      title,
      channels: channelIds.map(id => Types.ObjectId(id))
    };
    const createdSubGrp = new this.subscriptionGroupModel(sub);
    return createdSubGrp.save();
  }

  deleteSubscriptionGroup(groupId: string): Promise<Deletion> {
    return this.subscriptionGroupModel.deleteOne({ _id: groupId }).exec();
  }

  editSubscriptionGroup(groupId: string, jsonpatchDto: any): Promise<any>{
    return null;
  }
}