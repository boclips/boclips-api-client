export interface ManualIngest {
  type: 'MANUAL';
  url?: undefined;
}

export interface CustomIngest {
  type: 'CUSTOM';
  url?: undefined;
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
