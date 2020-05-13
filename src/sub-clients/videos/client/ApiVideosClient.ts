import { VideosClient } from './VideosClient';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { VideosConverter } from '../model/VideosConverter';
import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';
import { VideoSearchRequest } from '../model/VideoSearchRequest';
import Pageable from '../../common/model/Pageable';
import { PageableConverter } from '../../common/model/PageableConverter';
import { VideoEntity } from '../model/VideoEntity';
import { PageableEntity } from '../../common/model/PageableEntity';
import { ResourceProjection } from '../../common/model/ResourceProjection';
import { UpdateCaptionRequest } from '../model/UpdateCaptionRequest';
import { CaptionsConverter } from '../model/CaptionsConverter';
import { CaptionContent } from '../model/CaptionContent';
import { ProjectedResource } from '../../common/model/ProjectedResource';

export class ApiVideosClient extends ApiSubClient implements VideosClient {
  public async get(id: string): Promise<Video> {
    const videoLink = this.getLinkOrThrow('video');
    const response = await this.axios.get(
      expandUrlTemplate(videoLink.href, { id }),
    );

    return VideosConverter.convert(response.data);
  }

  async getVideoProjection(
    video: ProjectedResource,
    projection: keyof ResourceProjection,
  ) {
    const link = video._links[projection]?.getOriginalLink();

    if (!link) {
      throw Error(`Projection ${projection} not available in these links`);
    }
    const response = await this.axios.get(link);

    return VideosConverter.convert(response.data);
  }

  public async search(
    searchRequest: VideoSearchRequest,
  ): Promise<Pageable<Video>> {
    const link = this.getLinkOrThrow('searchVideos');
    const response = await this.axios.get<PageableEntity<VideoEntity>>(
      expandUrlTemplate(link.href, { ...searchRequest }),
    );

    return PageableConverter.convert<VideoEntity, Video>(
      response.data,
      'videos',
      VideosConverter.convert,
    );
  }

  public async update(
    id: string,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const videoLink = this.getLinkOrThrow('video');
    const response = await this.axios.patch(
      expandUrlTemplate(videoLink.href, { id }),
      updateVideoRequest,
    );

    return VideosConverter.convert(response.data);
  }

  public async updateCaptions(
    id: string,
    updateCaptionsRequest: UpdateCaptionRequest,
  ): Promise<string> {
    const captionsLink = this.getLinkOrThrow('getCaptions');

    return await this.axios.put(
      expandUrlTemplate(captionsLink.href, { id }),
      updateCaptionsRequest,
    );
  }

  public async getCaptions(id: string): Promise<CaptionContent> {
    const captionsLink = this.getLinkOrThrow('getCaptions');
    const response = await this.axios.get(
      expandUrlTemplate(captionsLink.href, { id }),
    );

    return CaptionsConverter.convert(response.data);
  }

  public async deleteThumbnail(video: Video): Promise<Video> {
    const link = video.playback.links?.deleteThumbnail;
    if (!link) throw new Error(`Not authorized`);

    const response = await this.axios.delete(link.getOriginalLink());
    return VideosConverter.convert(response.data);
  }

  public async setThumbnail(video: Video, second: number): Promise<Video> {
    const link = video.playback.links?.setThumbnail;
    if (!link) throw new Error(`Not authorized`);

    const response = await this.axios.patch(
      link.getTemplatedLink({ thumbnailSecond: second }),
    );
    return VideosConverter.convert(response.data);
  }
}
