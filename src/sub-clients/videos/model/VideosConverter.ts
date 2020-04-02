import { VideoWithBoclipsProjection, Video } from './Video';
import { convertLinks } from '../../common/utils/convertLinks';
import { PlaybackConverter } from '../../common/model/PlaybackConverter';

export class VideosConverter {
  public static convert(entity: any): Video | VideoWithBoclipsProjection {
    const hasBoclipsProjection: boolean = entity.contentPartnerId !== undefined;

    const videoWithPublicFields: Video = {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      releasedOn: new Date(entity.releasedOn),
      playback: PlaybackConverter.convert(entity.playback),
      subjects: entity.subjects,
      badges: entity.badges,
      legalRestrictions: entity.legalRestrictions,
      ageRange: entity.ageRange,
      rating: entity.rating,
      yourRating: entity.yourRating,
      bestFor: entity.bestFor,
      createdBy: entity.createdBy,
      promoted: entity.promoted,
      language: entity.language,
      links: convertLinks(entity),
    };

    if (hasBoclipsProjection) {
      return {
        ...videoWithPublicFields,
        contentPartner: entity.contentPartner,
        contentPartnerId: entity.contentPartnerId,
        contentPartnerVideoId: entity.contentPartnerVideoId,
        type: entity.type,
      } as VideoWithBoclipsProjection;
    } else {
      return videoWithPublicFields;
    }
  }
}
