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

  async createSubscription(sub: Subscription | OpmlSubscription): Promise<SubscriptionDoc> {
    const subDoc: Subscription = (sub as OpmlSubscription).type ? this.fromOpmlToSub(sub as OpmlSubscription) : sub as Subscription;
    let subSaved: SubscriptionDoc;
    try {
      subSaved = await this.subscriptionModel.create(subDoc)
    } catch (err) {
      // Duplicate key on channelId
      if (err.code === 11000 && err.keyPattern.channelId === 1) {
        subSaved = await this.subscriptionModel.findOne({ rssUrl: subDoc.rssUrl }).exec();
      } else {
        throw err;
      }
    }
    return subSaved;
  }

  async findOne(id): Promise<SubscriptionDoc> {
    return this.subscriptionModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<SubscriptionDoc[]> {
    return this.subscriptionModel.find().exec();
  }

  /**
   * Get a channel videos from RSS feed
   * @param sub The subscribed channel from which get the videos
   */
  async getSubVideos(subUrl: string): Promise<Video[]> {
    const parsedItems = await this.rssService.fetchRss(subUrl);
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
   * Get a channel videos from RSS feed
   * @param subs The subscribed channels from which get the videos
   */
  async getSubsVideos(subs: Subscription[]): Promise<Video[]> {
    const promises: Promise<Video[]>[] = [];
    subs.forEach(sub => promises.push(this.getSubVideos(sub.rssUrl)));
    return Promise.all(promises).then((videos: Video[][]) => {
      return videos.flat();
    });
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