import { VideosClient } from './VideosClient';
import { ApiSubClient } from '../../common/client/ApiSubClient';
import expandUrlTemplate from '../../common/utils/expandUrlTemplate';
import { VideosConverter } from '../model/VideosConverter';
import { VideoWithBoclipsProjection, Video } from '../model/Video';
import { hasBoclipsProjection } from '../utils/hasBoclipsProjection';

export class ApiVideosClient extends ApiSubClient implements VideosClient {
  public async get(id: string): Promise<Video> {
    const videoLink = this.getLinkOrThrow('video');
    const response = await this.axios.get(
      expandUrlTemplate(videoLink.href, { id }),
    );

    return VideosConverter.convert(response.data);
  }

  public hasBoclipsProjection(
    video: VideoWithBoclipsProjection | Video,
  ): video is VideoWithBoclipsProjection {
    return hasBoclipsProjection(video);
  }
}
