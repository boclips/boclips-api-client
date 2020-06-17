import { Link } from '../sub-clients/common/model/LinkEntity';
import { Video } from '../sub-clients/videos/model/Video';
import { PlaybackFactory } from './PlaybackFactory';
import { CaptionStatus } from '../sub-clients/videos/model/CaptionStatus';

export class VideoFactory {
  public static sample = (video: Partial<Video>): Video => ({
    ...VideoFactory.defaultFields(),
    ...video,
  });

  protected static defaultFields = (): Video => ({
    id: 'video-123',
    title: 'video title',
    description: 'video description',
    releasedOn: new Date(),
    playback: PlaybackFactory.sample(),
    subjects: [],
    badges: [],
    legalRestrictions: '',
    ageRange: {},
    rating: 4,
    yourRating: undefined,
    bestFor: [],
    createdBy: '',
    promoted: false,
    language: { code: 'en-US', displayName: 'English (US)' },
    attachments: [],
    captionStatus: CaptionStatus.PROCESSING,
    links: {
      self: new Link({ href: 'http://link-to-video' }),
      logInteraction: new Link({ href: 'http://link-to-log-interaction' }),
      update: undefined,
    },
  });
}

export class VideoWithBoclipsProjectionFactory extends VideoFactory {
  public static sample = (video: Partial<Video>): Video => ({
    ...VideoWithBoclipsProjectionFactory.defaultFields(),
    ...video,
  });

  protected static defaultFields = (): Video => ({
    ...VideoFactory.defaultFields(),
    channel: 'some content partner',
    channelId: 'partner-1',
    channelVideoId: 'video-id',
    types: [{ id: 1, name: 'INSTRUCTIONAL' }],
  });
}
