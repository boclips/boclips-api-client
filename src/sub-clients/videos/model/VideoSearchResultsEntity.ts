import { PageableEntity } from '../../common/model/PageableEntity';
import { VideoEntity } from './VideoEntity';
import { VideoFacets } from './VideoFacets';

export interface VideoSearchResultsEntity
  extends Omit<PageableEntity<VideoEntity>, '_embedded'> {
  _embedded: { videos: VideoEntity[]; facets?: VideoFacets };
}
