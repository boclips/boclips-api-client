import { VideoSearchResultsEntity } from '../sub-clients/videos/model/VideoSearchResultsEntity';
import { VideosEntityFactory } from './VideosEntityFactory';

export class VideoSearchResultsEntityFactory {
  public static sample = (
    videoSearchResults: Partial<VideoSearchResultsEntity>,
  ): VideoSearchResultsEntity => ({
    _embedded: {
      videos: [VideosEntityFactory.sample({})],
      facets: {
        ageRanges: {
          '3-4': { hits: 4 },
        },
        subjects: {
          'Art History': { hits: 4 },
        },
        durations: {
          'P20-P40': { hits: 4 },
        },
        resourceTypes: {
          'Lesson Guide': { hits: 4 },
        },
      },
      ...videoSearchResults._embedded,
    },
    page: {
      number: 1,
      size: 1,
      totalElements: 1,
      totalPages: 1,
      ...videoSearchResults.page,
    },
    _links: {
      ...videoSearchResults._links,
    },
  });
}
