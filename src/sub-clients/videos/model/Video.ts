import { Subject } from '../../subjects/model/Subject';
import { Playback } from '../../common/model/Playback';
import { AgeRange } from '../../common/model/AgeRange';
import { BestForTag } from '../../bestForTags/model/BestForTag';
import { Language } from './Language';
import { VideoType } from '../../videoTypes/model/VideoType';
import { Link } from '../../common/model/LinkEntity';
import { ModelWithLinks } from '../../common/model/common';

export interface BaseVideo extends ModelWithLinks {}

export interface Video extends BaseVideo {
  id: string;
  title: string;
  description: string;
  releasedOn: Date;
  playback: Playback;
  subjects: Subject[];
  badges: string[];
  legalRestrictions: string;
  ageRange: AgeRange;
  rating?: number;
  yourRating?: number;
  bestFor: BestForTag[];
  createdBy: string;
  promoted: boolean;
  language: Language;
  links: {
    self: Link;
    logInteraction: Link;
    update?: Link;
    rate?: Link;
    tag?: Link;
    transcript?: Link;
  };
}

export interface VideoWithBoclipsProjection extends Video {
  contentPartner: string;
  contentPartnerId: string;
  contentPartnerVideoId: string;
  type: VideoType;
}
