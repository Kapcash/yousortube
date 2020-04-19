import { Module, HttpModule, HttpService } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RssModule } from './rss/rss.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SubscriptionGroupsModule } from './subscriptions-groups/subscriptionGroups.module';
import { YoutubeApiModule } from './youtube-api/youtupeApi.module';
import { AxiosRequestConfig } from 'axios';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RssModule,
    SubscriptionsModule,
    SubscriptionGroupsModule,
    YoutubeApiModule,
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/yousortube'),
    UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private httpService: HttpService) {}
  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use((config: AxiosRequestConfig) => {
      console.debug(`${config.method.toUpperCase()} ${config.url}
      body: ${JSON.stringify(config.params)}`);
      return config;
    });
  }
}
