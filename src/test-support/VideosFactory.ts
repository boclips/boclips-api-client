import { Link } from '../sub-clients/common/model/LinkEntity';
import { Video } from '../sub-clients/videos/model/Video';
import { PlaybackFactory } from './PlaybackFactory';

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
    contentPartner: 'some content partner',
    contentPartnerId: 'partner-1',
    contentPartnerVideoId: 'video-id',
    type: { id: 1, name: 'INSTRUCTIONAL' },
  });
}
