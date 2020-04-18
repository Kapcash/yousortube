import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { OpmlService } from './opml.service';

@Module({
  imports: [],
  providers: [RssService, OpmlService],
  exports: [RssService, OpmlService],
})
export class RssModule {}