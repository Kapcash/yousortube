import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionDoc, Subscription, Video } from './subscription.interface';
import { RssService } from 'src/rss/rss.service';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectModel('Subscription') private subscriptionModel: Model<SubscriptionDoc>,
    private readonly rssService: RssService,
  ) {}

  createSubscription(sub: SubscriptionDoc) {
    const createdSub = new this.subscriptionModel(sub);
    return createdSub.save();
  }

  async findAll(): Promise<SubscriptionDoc[]> {
    return this.subscriptionModel.find().exec();
  }

  /**
   * Get a channel videos from RSS feed
   * @param sub The subscribed channel from which get the videos
   */
  async getSubVideos(sub: Subscription): Promise<Video[]> {
    const parsedItems = await this.rssService.fetchRss(sub.url);
    return parsedItems.map(item => ({
      id: item.id,
      isoDate: item.isoDate,
      pubDate: item.pubDate,
      title: item.title,
      link: item.link,
      author: item.author,
    }));
  }
}