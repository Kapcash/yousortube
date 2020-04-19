export interface Entity {
  kind: string;
  /** Entity id */
  etag: string;
}

export interface ResponseApi<T> extends Entity {
  kind: 'youtube#videoListResponse';
  pageInfo: {
      totalResults: number;
      resultsPerPage: number;
  },
  items: T[];
}

export interface VideoResponse extends Entity {
  kind: 'youtube#video',
  id: string,
  snippet?: Snippet;
  player?: Player;
}

export interface Player {
  /** Html stringified of the youtube player iframe */
  embedHtml: string;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  }
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
