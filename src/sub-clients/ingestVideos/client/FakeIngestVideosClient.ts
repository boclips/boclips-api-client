import { IngestVideosClient } from './IngestVideosClient';
import { Clearable } from '../../common/utils/Clearable';
import { PageRequest } from '../../common/model/PageRequest';
import { IngestVideo } from '../model/IngestVideo';
import Pageable from '../../common/model/Pageable';
import { Link } from '../../../types';

export class FakeIngestVideosClient implements IngestVideosClient, Clearable {
  private videos: IngestVideo[] = [];

  public insertIngestVideoFixture(video: IngestVideo) {
    this.videos.push(video);
  }

  getAll(page: PageRequest): Promise<Pageable<IngestVideo>> {
    return Promise.resolve({
      page: this.videos,
      pageSpec: {
        number: page.page,
        size: page.size,
        totalElements: this.videos.length,
        totalPages: Math.floor(this.videos.length / page.size),
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
