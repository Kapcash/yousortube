import { Dto } from './dto';
import { Type } from 'class-transformer';
import { Subscription } from 'src/subscriptions/subscription.interface';

/** Exposed subscription DTO entity */
export class SubscriptionDto extends Dto {

  name: string;
  rssUrl: string;
  channelId?: string;

  constructor(partial: Partial<SubscriptionDto>) {
    super();
    Object.assign(this, partial);
  }
}
export class SubsResponse {

  @Type(() => SubscriptionDto)
  subs: Subscription[]   
}
