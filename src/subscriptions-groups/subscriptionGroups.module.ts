import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionGroupsService } from './subscriptionGroups.service';
import { SubscriptionGroupSchema } from './subscriptionGroups.interface';
import { SubscriptionGroupController } from './subscriptionsGroups.controller';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { YoutubeApiModule } from 'src/youtube-api/youtupeApi.module';

@Module({
  imports: [SubscriptionsModule, YoutubeApiModule, MongooseModule.forFeature([{ name: 'SubscriptionGroup', schema: SubscriptionGroupSchema }])],
  controllers: [SubscriptionGroupController],
  providers: [SubscriptionGroupsService],
  exports: [SubscriptionGroupsService],
})
export class SubscriptionGroupsModule {}
