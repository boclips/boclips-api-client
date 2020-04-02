import { VideosClient } from './VideosClient';
import { VideoWithBoclipsProjection, Video } from '../model/Video';
import { Clearable } from '../../common/utils/Clearable';
import { hasBoclipsProjection } from '../utils/hasBoclipsProjection';

export class FakeVideosClient implements VideosClient, Clearable {
  private videos: Video[] = [];

  public get(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video === undefined ? Promise.reject() : Promise.resolve(video);
  }

  public hasBoclipsProjection(
    video: VideoWithBoclipsProjection | Video,
  ): video is VideoWithBoclipsProjection {
    return hasBoclipsProjection(video);
  }

  public insertVideo(video: Video): void {
    this.videos.push(video);
  }
  public clear() {
    this.videos = [];
  }
}
