import { Document, Schema } from 'mongoose';

// === SubscriptionGroup === //

export interface SubscriptionGroup {
  readonly channels: string[];
  readonly title: string;
}

export interface SubscriptionGroupDoc extends SubscriptionGroup, Document {}

export const SubscriptionGroupSchema = new Schema({
  channels: [Schema.Types.ObjectId],
  title: { type: String, default: 'New group'},
  creationDate: { type: Date, default: Date.now },
});

// === Video === //

export interface Video {
  id: string;
  isoDate: string;
  pubDate: string;
  title: string;
  link: string;
  author: string;
}