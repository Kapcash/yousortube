import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionDoc, Subscription, Video } from './subscription.interface';
import { RssService, OpmlSubscription } from 'src/rss/rss.service';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectModel('Subscription') private subscriptionModel: Model<SubscriptionDoc>,
    private readonly rssService: RssService,
  ) {}

  createSubscription(sub: Subscription | OpmlSubscription) {
    const subDoc = (sub as OpmlSubscription).type ? this.fromOpmlToSub(sub as OpmlSubscription) : sub;
    const createdSub = new this.subscriptionModel(subDoc);
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
    const parsedItems = await this.rssService.fetchRss(sub.rssUrl);
    return parsedItems.map(item => ({
      id: item.id,
      isoDate: item.isoDate,
      pubDate: item.pubDate,
      title: item.title,
      link: item.link,
      author: item.author,
    }));
  }

  /**
   * TODO Move to a model class
   * @param opmlSub
   */
  fromOpmlToSub(opmlSub: OpmlSubscription): Subscription {
    return {
      name: opmlSub.title,
      rssUrl: opmlSub.xmlUrl,
    }
  }
}