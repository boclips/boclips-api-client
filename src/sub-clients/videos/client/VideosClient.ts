import { Video } from '../model/Video';

export interface VideosClient {
  get(id: string): Promise<Video>;
}
