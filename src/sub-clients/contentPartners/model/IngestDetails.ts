export interface ManualIngest {
  type: 'MANUAL';
  url?: never;
}

export interface CustomIngest {
  type: 'CUSTOM';
  url?: never;
}

export interface MrssFeedIngest {
  type: 'MRSS';
  url: string;
}

export interface YoutubeScrapeIngest {
  type: 'YOUTUBE';
  url: string;
}

export type IngestDetails =
  | ManualIngest
  | CustomIngest
  | MrssFeedIngest
  | YoutubeScrapeIngest;
