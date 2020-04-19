import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionGroupService } from './subscriptionGroups.service';
import { SubscriptionGroupSchema } from './subscriptionGroups.interface';
import { SubscriptionGroupController } from './subscriptionsGroups.controller';
import { SubscriptionModule } from 'src/subscriptions/subscriptions.module';
import { YoutubeApiModule } from 'src/youtube-api/youtupeApi.module';

@Module({
  imports: [SubscriptionModule, YoutubeApiModule, MongooseModule.forFeature([{ name: 'SubscriptionGroup', schema: SubscriptionGroupSchema }])],
  controllers: [SubscriptionGroupController],
  providers: [SubscriptionGroupService],
})
export class SubscriptionGroupModule {}
