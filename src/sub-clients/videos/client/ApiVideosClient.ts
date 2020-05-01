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

export class ApiVideosClient extends ApiSubClient implements VideosClient {
  public async get(id: string): Promise<Video> {
    const videoLink = this.getLinkOrThrow('video');
    const response = await this.axios.get(
      expandUrlTemplate(videoLink.href, { id }),
    );

    return VideosConverter.convert(response.data);
  }

  async getVideoProjection(
    video: { _links: ResourceProjection },
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
}
