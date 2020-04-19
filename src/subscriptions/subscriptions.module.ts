import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './subscription.interface';
import { RssModule } from 'src/rss/rss.module';
import { SubscriptionController } from './subscriptions.controller';

@Module({
  imports: [RssModule, MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionsModule {}
