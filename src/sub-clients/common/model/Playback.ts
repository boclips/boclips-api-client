import { Duration } from 'moment';
import { ModelWithLinks } from './common';
import { Link } from './LinkEntity';

export interface Playback extends ModelWithLinks {
  id: string;
  type: 'STREAM' | 'YOUTUBE';
  duration: Duration;
  maxResolutionAvailable?: boolean;
  links: {
    createPlaybackEvent?: Link;
    createPlayerInteractedWithEvent: any;
    download?: Link;
    thumbnail: Link;
    setThumbnail?: Link;
    deleteThumbnail?: Link;
    videoPreview?: Link;
    hlsStream?: Link;
  };
}
