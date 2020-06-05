import {
  IngestVideosClient,
  IngestVideosFilterRequest,
} from './IngestVideosClient';
import { Clearable } from '../../common/utils/Clearable';
import { PageRequest } from '../../common/model/PageRequest';
import { IngestVideo } from '../model/IngestVideo';
import Pageable from '../../common/model/Pageable';
import { Link } from '../../../types';
import { isNotEmpty } from './isNotEmpty';

export class FakeIngestVideosClient implements IngestVideosClient, Clearable {
  private videos: IngestVideo[] = [];

  public insertIngestVideoFixture(video: IngestVideo) {
    this.videos.push(video);
  }

  private static applyFilters(
    video: IngestVideo,
    filterRequest?: IngestVideosFilterRequest,
  ): boolean {
    if (filterRequest && isNotEmpty(filterRequest.channelName)) {
      return video.channel.name === filterRequest.channelName;
    } else if (filterRequest && filterRequest.statuses) {
      return filterRequest.statuses.includes(video.status);
    } else {
      return true;
    }
  }

  getAll(
    page: PageRequest,
    filterRequest?: IngestVideosFilterRequest,
  ): Promise<Pageable<IngestVideo>> {
    const videosToReturn = this.videos.filter(it =>
      FakeIngestVideosClient.applyFilters(it, filterRequest),
    );

    return Promise.resolve({
      page: videosToReturn,
      pageSpec: {
        number: page.page,
        size: page.size,
        totalElements: videosToReturn.length,
        totalPages: Math.floor(videosToReturn.length / page.size),
        nextPage: new Link({
          href: `/v1/ingest-videos?size=${page.size}&page=${page.page + 1}`,
        }),
        previousPage: new Link({
          href: `/v1/ingest-videos?size=${page.size}&page=${page.page - 1}`,
        }),
      },
    });
  }
  clear() {
    this.videos = [];
  }
}
