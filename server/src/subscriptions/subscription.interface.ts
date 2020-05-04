import { Document, Schema } from 'mongoose';

// === Subscription === //

export interface Subscription {
  readonly name: string;
  readonly rssUrl: string;
  readonly channelId?: string;
}

export interface SubscriptionDoc extends Subscription, Document {}

export const SubscriptionSchema = new Schema({
  name: String,
  rssUrl: String,
  channelId: {
    type: String,
    unique: true,
    default: function() {
      const idParam = 'channel_id=';
      const firstIndex = this.rssUrl.indexOf(idParam) + idParam.length;
      const lastIndex = this.rssUrl.substring(firstIndex).indexOf('&');
      return this.rssUrl.substring(firstIndex, Math.max(lastIndex, this.rssUrl.length))
    }
  },
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