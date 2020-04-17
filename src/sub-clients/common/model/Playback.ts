import { Duration } from 'moment';
import { ModelWithLinks } from './common';
import { Link } from './LinkEntity';

export interface Playback extends ModelWithLinks {
  id: string;
  type: 'STREAM' | 'YOUTUBE';
  duration: Duration;
  links: {
    createPlaybackEvent?: Link;
    createPlayerInteractedWithEvent: any;
    download?: Link;
    thumbnail: Link;
    videoPreview?: Link;
    hlsStream?: Link;
  };
}
