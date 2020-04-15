import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';

export interface VideosClient {
  get(id: string): Promise<Video>;
  update(id: string, updateVideoRequest: UpdateVideoRequest): Promise<Video>;
}
