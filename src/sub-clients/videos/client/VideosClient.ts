import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import { ResourceProjection } from '../../common/model/ResourceProjection';
import { ProjectedResource } from '../../common/model/ProjectedResource';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';
import { CaptionContent } from '../model/CaptionContent';
import { VideoSearchResults } from '../model/VideoSearchResults';

export interface VideosClient {
  get(id: string, referer?: string, shareCode?: string): Promise<Video>;
  search(searchRequest: VideoSearchRequest): Promise<VideoSearchResults>;
  update(id: string, updateVideoRequest: UpdateVideoRequest): Promise<Video>;
  updateCaptions(
    id: string,
    updateCaptionsRequest: UpdateCaptionRequest,
  ): Promise<string>;
  getCaptions(id: string): Promise<CaptionContent>;
  setCustomThumbnail(video: Video, file: File): Promise<Video>;
  setThumbnailBySecond(video: Video, second: number): Promise<Video>;
  deleteThumbnail(video: Video): Promise<Video>;
  getVideoProjection(
    video: ProjectedResource,
    projection: keyof ResourceProjection,
  ): Promise<Video>;
}
