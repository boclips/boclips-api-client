import { VideosClient } from './VideosClient';
import { Video } from '../model/Video';
import { Clearable } from '../../common/utils/Clearable';

export class FakeVideosClient implements VideosClient, Clearable {
  private videos: Video[] = [];

  public get(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video === undefined ? Promise.reject() : Promise.resolve(video);
  }

  public insertVideo(video: Video): void {
    this.videos.push(video);
  }
  public clear() {
    this.videos = [];
  }
}
