import Pageable from '../../common/model/Pageable';
import { Video } from './Video';
import { VideoFacets } from './VideoFacets';

export interface VideoSearchResults extends Pageable<Video> {
  facets?: VideoFacets;
}
