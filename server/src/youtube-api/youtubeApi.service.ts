import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseApi, VideoResponse } from './youtube.v3';
import { VideoDto } from 'src/subscriptions-groups/subscriptionGroups.interface';

@Injectable()
export class YoutubeApiService {

  private readonly YOUTUBE_API_KEY: string;
  private readonly YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ){
    this.YOUTUBE_API_KEY = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  /** Parse an RSS video id to retrieve the simple video id */
  parseRssIdToSimpleId(rssVideoId: string) {
    const values = rssVideoId.split(':')
    return values[values.length - 1];
  }

  /** Retrieve videos information from youtube api */
  getVideosInfo(videoIds: string[]): Promise<VideoResponse[]> {
    videoIds = videoIds.map(videoId => this.parseRssIdToSimpleId(videoId));

    return this.httpService.get(`${this.YOUTUBE_BASE_URL}/videos`, {
      params: {
        part: 'snippet,player',
        id: videoIds.join(','),
        key: this.YOUTUBE_API_KEY,
      }
    })
    .toPromise()
    .then(res => res.data)
    .then((ytResponse: ResponseApi<VideoResponse>) => ytResponse.items);
  }

  /**
   * TODO Move to a model class
   * @param video A YT video object
   * @return a corresponding VideoDto
   */
  fromFullVideoToDto(video: VideoResponse): VideoDto {
    return {
      id: video.id,
      pubDate: video.snippet.publishedAt,
      title: video.snippet.title,
      link: '',
      author: video.snippet.channelTitle,
      thumbnailUrl: video.snippet.thumbnails.standard.url,
    }
  }

}