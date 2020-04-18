import { Document, Schema, Types } from 'mongoose';
import { Subscription } from 'src/subscriptions/subscription.interface';

// === SubscriptionGroup === //

export interface SubscriptionGroup {
  readonly title: string;
  readonly channels: Types.ObjectId[] | Subscription[];
  readonly creationDate?: Date;
}

export interface SubscriptionGroupDoc extends SubscriptionGroup, Document {}

export const SubscriptionGroupSchema = new Schema({
  title: { type: String, default: 'New group'},
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  }],
  creationDate: { type: Date, default: Date.now },
});

export interface CreateSubGroupDto {
  groupTitle: string,
  channelIds?: string[]
}

// === Video === //

export interface Video {
  id: string;
  isoDate: string;
  pubDate: string;
  title: string;
  link: string;
  author: string;
}