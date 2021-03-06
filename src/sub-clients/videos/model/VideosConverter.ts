import { Video } from './Video';
import { convertLinks } from '../../common/utils/convertLinks';
import { PlaybackConverter } from '../../common/model/PlaybackConverter';
import { convertAttachment } from '../../common/utils/convertAttachment';
import { CaptionStatus } from './CaptionStatus';

export class VideosConverter {
  public static convert(entity: any): Video {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      additionalDescription: entity.additionalDescription,
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
      channel: entity.channel,
      channelId: entity.channelId,
      channelVideoId: entity.channelVideoId,
      types: entity.types,
      attachments: entity.attachments.map(convertAttachment) || [],
      contentWarnings: entity.contentWarnings,
      captionStatus: (CaptionStatus as any)[entity.captionStatus] ?? undefined,
      price: entity.price,
    };
  }
}
