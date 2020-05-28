import { Playback } from './Playback';
import moment from 'moment';
import { convertLinks } from '../utils/convertLinks';

export class PlaybackConverter {
  public static convert(entity: any): Playback {
    return {
      id: entity.id,
      type: entity.type,
      duration: moment.duration(entity.duration),
      maxResolutionAvailable: entity.maxResolutionAvailable,
      links: convertLinks(entity),
    };
  }
}
