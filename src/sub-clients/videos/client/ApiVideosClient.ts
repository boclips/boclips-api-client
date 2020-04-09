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
    videoWithLinks: Pick<Video, 'links'>,
    updateVideoRequest: UpdateVideoRequest,
  ): Promise<Video> {
    const validUpdateLink = videoWithLinks.links.update;
    if (!validUpdateLink) {
      throw new Error('Update link not available');
    }

    return this.axios
      .patch(validUpdateLink.getTemplatedLink({}), updateVideoRequest)
      .then(response => VideosConverter.convert(response.data));
  }
}
