import {
  VideoWithBoclipsProjection,
  Video,
} from '../sub-clients/videos/model/Video';

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
    playback: { type: 'STREAM' },
    subjects: [],
    badges: [],
    legalRestrictions: '',
    ageRange: {},
    rating: 4,
    yourRating: undefined,
    bestFor: undefined,
    createdBy: undefined,
    promoted: false,
    language: undefined,
    links: {
      self: null,
      logInteraction: null,
      update: null,
    },
  });
}

export class VideoWithBoclipsProjectionFactory extends VideoFactory {
  public static sample = (
    video: Partial<VideoWithBoclipsProjection>,
  ): VideoWithBoclipsProjection => ({
    ...VideoWithBoclipsProjectionFactory.defaultFields(),
    ...video,
  });

  protected static defaultFields = (): VideoWithBoclipsProjection => ({
    ...VideoFactory.defaultFields(),
    contentPartner: 'some content partner',
    contentPartnerId: 'partner-1',
    contentPartnerVideoId: 'video-id',
    type: { id: 1, name: 'INSTRUCTIONAL' },
  });
}
