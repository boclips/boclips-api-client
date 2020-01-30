import { IngestVideo } from './../sub-clients/ingestVideos/model/IngestVideo';

export class IngestVideosFactory {
  public static sample(video: Partial<IngestVideo> = {}): IngestVideo {
    return {
      id: video.id || '12345678',
      contentPartner: video.contentPartner || {
        id: '098765',
        name: 'How much wood would a woodchuck chuk',
      },
      ingestJob: video.ingestJob || {
        id: '67891235',
      },
      ingestStartedAt: video.ingestStartedAt || new Date(),
      title: video.title || 'If a woodchuck could chuck wood',
      status: video.status || 'SUCCESSFUL',
    };
  }
}
