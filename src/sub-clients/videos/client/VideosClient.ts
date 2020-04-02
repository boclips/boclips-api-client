import { VideoWithBoclipsProjection, Video } from '../model/Video';

export interface VideosClient {
  get(id: string): Promise<Video>;
  hasBoclipsProjection(
    video: VideoWithBoclipsProjection | Video,
  ): video is VideoWithBoclipsProjection;
}
