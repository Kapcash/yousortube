import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { RssModule } from './rss/rss.module';
import { SubscriptionModule } from './subscriptions/subscriptions.module';
import { SubscriptionGroupModule } from './subscriptions-groups/subscriptionGroups.module';

@Module({
  imports: [RssModule, SubscriptionModule, SubscriptionGroupModule, MongooseModule.forRoot('mongodb://localhost/yousortube')],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
