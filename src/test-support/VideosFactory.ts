import { Video } from '../sub-clients/common/model/Video';

export class VideoFactory {
  public static sample = (video: Partial<Video>): Video => ({
    ...VideoFactory.defaultFields(),
    ...video,
  });

  private static defaultFields = (): Video => ({
    id: 'video-123',
    title: 'video title',
    description: 'video description',
    contentPartner: 'some content partner',
    disabledDistributionMethods: [],
    links: {
      update: null,
    },
    subjects: [],
  });
}
