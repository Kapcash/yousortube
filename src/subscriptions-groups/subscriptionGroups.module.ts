import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionGroupService } from './subscriptionGroups.service';
import { SubscriptionGroupSchema } from './subscriptionGroups.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubscriptionGroup', schema: SubscriptionGroupSchema }])],
  providers: [SubscriptionGroupService],
})
export class SubscriptionGroupModule {}
