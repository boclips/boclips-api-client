import { Playback } from '../sub-clients/common/model/Playback';
import moment from 'moment';
import { Link } from '../sub-clients/common/model/LinkEntity';

export class PlaybackFactory {
  public static sample = (playback?: Partial<Playback>): Playback => ({
    ...PlaybackFactory.defaultFields(),
    ...playback,
  });

  private static defaultFields = (): Playback => ({
    type: 'STREAM',
    id: 'playback-id',
    duration: moment.duration(),
    maxResolutionAvailable: true,
    links: {
      createPlayerInteractedWithEvent: new Link({ href: 'events' }),
      thumbnail: new Link({ href: 'thumbnail' }),
    },
  });
}
