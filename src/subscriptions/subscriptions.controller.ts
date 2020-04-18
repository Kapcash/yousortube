import { Controller, Get, HttpCode } from '@nestjs/common';
import { RssService, Subscription } from 'src/rss/rss.service';
import { OpmlService } from 'src/rss/opml.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly rssService: RssService,
    private readonly opmlService: OpmlService,
  ) {}
  
  @Get()
  @HttpCode(501)
  async getAllSubscriptions(): Promise<Subscription[]> {
    return [];
  }
}
