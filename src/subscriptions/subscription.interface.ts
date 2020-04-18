import { Document, Schema } from 'mongoose';

// === Subscription === //

export interface Subscription {
  readonly name: string;
  readonly url: string;
}

export interface SubscriptionDoc extends Subscription, Document {
}

export const SubscriptionSchema = new Schema({
  channel: String,
  author: String,
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