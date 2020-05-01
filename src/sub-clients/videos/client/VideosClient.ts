import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import Pageable from '../../common/model/Pageable';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { ResourceProjection } from '../../common/model/ResourceProjection';

export interface VideosClient {
  get(id: string): Promise<Video>;
  search(searchRequest: VideoSearchRequest): Promise<Pageable<Video>>;
  update(id: string, updateVideoRequest: UpdateVideoRequest): Promise<Video>;

  getVideoProjection(
    video: { _links: ResourceProjection },
    projection: keyof ResourceProjection,
  ): Promise<Video>;
}
