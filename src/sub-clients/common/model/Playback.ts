import { Duration } from 'dayjs/plugin/duration';
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
    setThumbnailBySecond?: Link;
    setCustomThumbnail?: Link;
    deleteThumbnail?: Link;
    videoPreview?: Link;
    hlsStream?: Link;
  };
}
