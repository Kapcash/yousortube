import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './subscription.interface';
import { RssModule } from 'src/rss/rss.module';

@Module({
  imports: [
    RssModule,
    MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }]),
  ],
  controllers: [],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionsModule {}
