import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from './subscription.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subscription', schema: SubscriptionSchema }])],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
