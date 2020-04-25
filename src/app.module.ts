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
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/yousortube'),
    AuthModule,
    UsersModule,
    RssModule,
    SubscriptionsModule,
    SubscriptionGroupsModule,
    YoutubeApiModule,
  ],
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
