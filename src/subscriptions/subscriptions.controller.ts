import { Controller, Get } from '@nestjs/common';
import { RssService } from 'src/rss/rss.service';
import { OpmlService } from 'src/rss/opml.service';
import { Subscription } from './subscription.interface';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly rssService: RssService,
    private readonly opmlService: OpmlService,
    private readonly subscriptionService: SubscriptionService,
  ) {}
  
  @Get()
  async getAllSubscriptions(): Promise<Subscription[]> {
    const opmlFile = await this.opmlService.getOpmlFile();
    const opmlSubscriptions = await this.rssService.parseOpml(opmlFile);
    const subs: Promise<Subscription>[] = [];
    opmlSubscriptions.forEach(sub => {
      subs.push(this.subscriptionService.createSubscription(sub));
    });
    return Promise.all(subs);
  }
}
