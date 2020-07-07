import { PageableConverter } from '../../common/model/PageableConverter';
import { PageableEntity } from '../../common/model/PageableEntity';
import { Video } from './Video';
import { VideoEntity } from './VideoEntity';
import { VideosConverter } from './VideosConverter';
import { VideoSearchResults } from './VideoSearchResults';
import { VideoSearchResultsEntity } from './VideoSearchResultsEntity';

export class VideoSearchResultsConverter {
  public static convert(entity: VideoSearchResultsEntity): VideoSearchResults {
    const entityWithoutFacets: PageableEntity<VideoEntity> = {
      ...entity,
      _embedded: {
        videos: entity._embedded.videos,
      },
    };
    const pageableVideos = PageableConverter.convert<VideoEntity, Video>(
      entityWithoutFacets,
      'videos',
      VideosConverter.convert,
    );

    return {
      ...pageableVideos,
      facets: entity._embedded.facets,
    };
  }
}
