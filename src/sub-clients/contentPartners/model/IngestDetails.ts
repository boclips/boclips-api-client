export interface ManualIngest {
  type: 'MANUAL';
  urls?: never;
}

export interface CustomIngest {
  type: 'CUSTOM';
  urls?: never;
}

export interface MrssFeedIngest {
  type: 'MRSS';
  urls: string[];
}

export interface YoutubeScrapeIngest {
  type: 'YOUTUBE';
  urls: string[];
}

export type IngestDetails =
  | ManualIngest
  | CustomIngest
  | MrssFeedIngest
  | YoutubeScrapeIngest;
