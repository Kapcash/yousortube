import { Injectable } from '@nestjs/common';
import * as xml2js from "xml2js";
import * as Parser from 'rss-parser';

export interface OpmlSubscription {
  text: string;
  title: string;
  type: string;
  xmlUrl: string;
}
 
@Injectable()
export class RssService {

  /**
   * Parse an opml file
   */
  public async parseOpml(opmlData: xml2js.convertableToString): Promise<OpmlSubscription[]> {
    let subs: OpmlSubscription[] = []
    const xml = await xml2js.parseStringPromise(opmlData);
    subs = xml.opml.body[0].outline[0].outline.map(sub => sub.$).filter(sub => sub.type === 'rss');

    return subs;
  }

  /** Fetch an RSS feed */
  public async fetchRss(rssUrl: string): Promise<Parser.Item[]> {
    const feed: Parser.Output = await new Parser().parseURL(rssUrl);
    console.log(feed.title);

    return feed.items;
  }
}