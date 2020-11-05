import { Playback } from './Playback';
import dayjs from '../../../dayjs/index';
import { convertLinks } from '../utils/convertLinks';

export class PlaybackConverter {
  public static convert(entity: any): Playback {
    return {
      id: entity.id,
      type: entity.type,
      duration: dayjs.duration(entity.duration),
      maxResolutionAvailable: entity.maxResolutionAvailable,
      links: convertLinks(entity),
    };
  }
}
