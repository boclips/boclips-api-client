import { PageableConverter } from '../../common/model/PageableConverter';
import { PageableEntity } from '../../common/model/PageableEntity';
import { Video } from './Video';
import { VideoEntity } from './VideoEntity';
import { VideosConverter } from './VideosConverter';
import { VideoSearchResults } from './VideoSearchResults';
import { VideoSearchResultsEntity } from './VideoSearchResultsEntity';
import { FacetEntity } from './VideoFacetsEntity';
import { Facet } from './VideoFacets';

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

    const convertFacets = (entity?: { [id: string]: FacetEntity }): Facet[] => {
      if (entity) {
        return Object.keys(entity).map((key) => {
          return {
            name: entity[key].name || key,
            id: entity[key].id || key,
            hits: entity[key].hits,
          };
        });
      } else {
        return [];
      }
    };

    return {
      ...pageableVideos,
      facets: {
        videoTypes: convertFacets(entity._embedded.facets?.videoTypes),
        subjects: convertFacets(entity._embedded.facets?.subjects),
        ageRanges: convertFacets(entity._embedded.facets?.ageRanges),
        resourceTypes: convertFacets(entity._embedded.facets?.resourceTypes),
        channels: convertFacets(entity._embedded.facets?.channels),
        durations: convertFacets(entity._embedded.facets?.durations),
      },
    };
  }
}
