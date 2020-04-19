import { Module, HttpModule, HttpService } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RssModule } from './rss/rss.module';
import { SubscriptionModule } from './subscriptions/subscriptions.module';
import { SubscriptionGroupModule } from './subscriptions-groups/subscriptionGroups.module';
import { YoutubeApiModule } from './youtube-api/youtupeApi.module';
import { AxiosRequestConfig } from 'axios';

@Module({
  imports: [
    RssModule,
    SubscriptionModule,
    SubscriptionGroupModule,
    YoutubeApiModule,
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/yousortube')],
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
