import { Document, Schema } from 'mongoose';

// === Subscription === //

export interface Subscription {
  readonly name: string;
  readonly rssUrl: string;
}

export interface SubscriptionDoc extends Subscription, Document {}

export const SubscriptionSchema = new Schema({
  name: String,
  rssUrl: String,
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