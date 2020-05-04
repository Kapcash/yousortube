import { Module, HttpModule } from '@nestjs/common';
import { YoutubeApiService } from './youtubeApi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [YoutubeApiService],
  exports: [YoutubeApiService],
})
export class YoutubeApiModule {}
