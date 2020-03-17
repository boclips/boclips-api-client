export interface ManualIngest {
  type: 'MANUAL';
  urls?: never;
  playlistIds?: never;
}

export interface CustomIngest {
  type: 'CUSTOM';
  urls?: never;
  playlistIds?: never;
}

export interface MrssFeedIngest {
  type: 'MRSS';
  urls: string[];
  playlistIds?: never;
}

export interface YoutubeScrapeIngest {
  type: 'YOUTUBE';
  urls?: never;
  playlistIds: string[];
}

export type IngestDetails =
  | ManualIngest
  | CustomIngest
  | MrssFeedIngest
  | YoutubeScrapeIngest;
