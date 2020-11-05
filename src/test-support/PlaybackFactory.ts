import { Playback } from '../sub-clients/common/model/Playback';
import dayjs from '../dayjs/index';
import { Link } from '../sub-clients/common/model/LinkEntity';

export class PlaybackFactory {
  public static sample = (playback?: Partial<Playback>): Playback => ({
    ...PlaybackFactory.defaultFields(),
    ...playback,
  });

  private static defaultFields = (): Playback => ({
    type: 'STREAM',
    id: 'playback-id',
    duration: dayjs.duration(),
    maxResolutionAvailable: true,
    links: {
      createPlayerInteractedWithEvent: new Link({ href: 'events' }),
      thumbnail: new Link({ href: 'thumbnail' }),
    },
  });
}
