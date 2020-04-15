import { VideosClient } from './VideosClient';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { VideosConverter } from '../model/VideosConverter';
import { Video } from '../model/Video';
import { UpdateVideoRequest } from '../model/UpdateVideoRequest';

export class ApiVideosClient extends ApiSubClient implements VideosClient {
  public async get(id: string): Promise<Video> {
    const videoLink = this.getLinkOrThrow('video');
    const response = await this.axios.get(
      expandUrlTemplate(videoLink.href, { id }),
    );

    return VideosConverter.convert(response.data);
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
