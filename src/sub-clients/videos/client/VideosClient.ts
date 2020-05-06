import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import Pageable from '../../common/model/Pageable';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { ResourceProjection } from '../../common/model/ResourceProjection';
import { ProjectedResource } from '../../common/model/ProjectedResource';

export interface VideosClient {
  get(id: string): Promise<Video>;
  search(searchRequest: VideoSearchRequest): Promise<Pageable<Video>>;
  update(id: string, updateVideoRequest: UpdateVideoRequest): Promise<Video>;

  getVideoProjection(
    video: ProjectedResource,
    projection: keyof ResourceProjection,
  ): Promise<Video>;
}
