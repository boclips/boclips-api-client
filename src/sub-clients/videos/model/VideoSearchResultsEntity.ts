import { PageableEntity } from '../../common/model/PageableEntity';
import { VideoEntity } from './VideoEntity';
import { VideoFacetsEntity } from './VideoFacetsEntity';

export interface VideoSearchResultsEntity
  extends Omit<PageableEntity<VideoEntity>, '_embedded'> {
  _embedded: { videos: VideoEntity[]; facets?: VideoFacetsEntity };
}
