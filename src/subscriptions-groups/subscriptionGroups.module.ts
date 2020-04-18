import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionGroupService } from './subscriptionGroups.service';
import { SubscriptionGroupSchema } from './subscriptionGroups.interface';
import { SubscriptionGroupController } from './subscriptionsGroups.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubscriptionGroup', schema: SubscriptionGroupSchema }])],
  controllers: [SubscriptionGroupController],
  providers: [SubscriptionGroupService],
})
export class SubscriptionGroupModule {}
